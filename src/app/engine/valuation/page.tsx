'use client';

import { useState, useMemo } from 'react';
import { z } from 'zod';
import {
  Column,
  Row,
  Grid,
  Heading,
  Text,
  Button,
  Input,
  Badge,
  Tag,
  Icon,
  AccordionGroup,
  Line,
} from '@once-ui-system/core';

// Validation schema
const valuationInputSchema = z.object({
  ppp: z.number().min(0, 'Price per 1% must be positive'),
  sss: z.number().min(0).max(100, 'Stake sold must be between 0 and 100%'),
  ddd: z.number().min(1, 'Duration must be at least 1 month'),
  rrr: z.number().min(0).max(100, 'Owner share must be between 0 and 100%'),
  nztrDeduction: z.number().min(0).max(100, 'NZTR deduction must be between 0 and 100%'),
});

type ValuationInputs = z.infer<typeof valuationInputSchema>;

interface ValuationResults {
  upfrontIncome: number;
  ownerReturnLease: number;
  ownerReturnNoLease: number;
  syndicatorBreakevenTTT: number;
  syndicatorBreakevenWWW: number;
  investorBreakevenTTT: number;
  investorBreakevenWWW: number;
  xAxisMax: number;
  chartData: Array<{
    ttt: number;
    www: number;
    leaseRevenue: number;
    leaseRevenueAfterNZTR: number;
    noLeaseRevenue: number;
  }>;
}

// Calculation functions
function calculateValuation(inputs: ValuationInputs): ValuationResults {
  const { ppp, sss, ddd, rrr, nztrDeduction } = inputs;
  
  // Upfront income: PPP × DDD/12 × SSS
  const upfrontIncome = ppp * (ddd / 12) * sss;
  
  // Net RRR after NZTR deductions
  const netRRR = Math.max(0, rrr - nztrDeduction);
  
  // Net rate for no-lease scenario (owner still pays NZTR)
  const noLeaseRate = Math.max(0, 100 - nztrDeduction);
  
  // SYNDICATOR BREAKEVEN (Net): Where lease after NZTR equals no-lease after NZTR
  // Lease: Upfront + netRRR% of WWW vs No-lease: (100 - NZTR)% of WWW
  // Breakeven TTT* = [100 × PPP × (DDD/12)] / [(100 - NZTR)/100 - netRRR/100]
  const syndicatorBreakevenTTT = (100 * ppp * (ddd / 12)) / ((noLeaseRate - netRRR) / 100);
  const syndicatorBreakevenWWW = (sss / 100) * syndicatorBreakevenTTT;
  
  // INVESTOR BREAKEVEN (Gross): Where lease gross equals no-lease after NZTR
  // Lease: Upfront + RRR% of WWW vs No-lease: (100 - NZTR)% of WWW
  // Breakeven TTT* = [100 × PPP × (DDD/12)] / [(100 - NZTR)/100 - rrr/100]
  const investorBreakevenTTT = (100 * ppp * (ddd / 12)) / ((noLeaseRate - rrr) / 100);
  const investorBreakevenWWW = (sss / 100) * investorBreakevenTTT;
  
  // Calculate syndicator returns at syndicator breakeven
  const ownerReturnLease = upfrontIncome + (netRRR / 100) * syndicatorBreakevenWWW;
  const ownerReturnNoLease = (noLeaseRate / 100) * syndicatorBreakevenWWW;
  
  // X-axis max = 2 × syndicator breakeven (the higher one)
  const xAxisMax = 2 * syndicatorBreakevenTTT;
  
  // Generate chart data points
  const numPoints = 50;
  const chartData: Array<{
    ttt: number;
    www: number;
    leaseRevenue: number;
    leaseRevenueAfterNZTR: number;
    noLeaseRevenue: number;
  }> = [];
  
  for (let i = 0; i <= numPoints; i++) {
    const tttValue = (i / numPoints) * xAxisMax;
    const wwwValue = (sss / 100) * tttValue;
    
    // No-lease line: owner keeps their stake but pays NZTR
    // Owner gets (100 - NZTR)% of their stake's winnings
    const noLeaseRate = Math.max(0, 100 - nztrDeduction);
    const noLeaseRevenue = (noLeaseRate / 100) * (sss / 100) * tttValue;
    
    // Lease line (gross): starts at upfront value with slope (RRR × SSS/100)
    // Owner gets upfront income + RRR% of the WWW (which is SSS% of TTT)
    const leaseRevenue = upfrontIncome + (rrr / 100) * wwwValue;
    
    // Lease after NZTR deductions: upfront + (RRR - nztrDeduction)% of WWW
    // NZTR takes their cut from the owner's share of winnings
    const netRRR = Math.max(0, rrr - nztrDeduction);
    const leaseRevenueAfterNZTR = upfrontIncome + (netRRR / 100) * wwwValue;
    
    chartData.push({
      ttt: tttValue,
      www: wwwValue,
      leaseRevenue,
      leaseRevenueAfterNZTR,
      noLeaseRevenue,
    });
  }
  
  return {
    upfrontIncome,
    ownerReturnLease,
    ownerReturnNoLease,
    syndicatorBreakevenTTT,
    syndicatorBreakevenWWW,
    investorBreakevenTTT,
    investorBreakevenWWW,
    xAxisMax,
    chartData,
  };
}

// Simple SVG-based chart component (no external dependencies)
function BreakevenChart({ 
  chartData, 
  syndicatorBreakevenTTT,
  investorBreakevenTTT, 
  upfrontIncome 
}: { 
  chartData: ValuationResults['chartData'];
  syndicatorBreakevenTTT: number;
  investorBreakevenTTT: number;
  upfrontIncome: number;
}) {
  // Responsive dimensions
  const width = 800;
  const height = 450;
  const padding = { top: 50, right: 150, bottom: 70, left: 90 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  const maxTTT = Math.max(...chartData.map(d => d.ttt));
  const maxRevenue = Math.max(
    ...chartData.map(d => Math.max(d.leaseRevenue, d.leaseRevenueAfterNZTR, d.noLeaseRevenue))
  );
  
  const scaleX = (ttt: number) => (ttt / maxTTT) * chartWidth;
  const scaleY = (revenue: number) => chartHeight - (revenue / maxRevenue) * chartHeight;
  
  // Y-axis formatting (one decimal place)
  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}k`;
    return `$${value.toFixed(0)}`;
  };
  
  // X-axis formatting (no decimal places)
  const formatCurrencyXAxis = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(0)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
    return `$${value.toFixed(0)}`;
  };
  
  // Generate path strings
  const leasePath = chartData
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(d.ttt) + padding.left} ${scaleY(d.leaseRevenue) + padding.top}`)
    .join(' ');
  
  const leaseAfterNZTRPath = chartData
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(d.ttt) + padding.left} ${scaleY(d.leaseRevenueAfterNZTR) + padding.top}`)
    .join(' ');
  
  const noLeasePath = chartData
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(d.ttt) + padding.left} ${scaleY(d.noLeaseRevenue) + padding.top}`)
    .join(' ');
  
  const syndicatorBreakevenX = scaleX(syndicatorBreakevenTTT) + padding.left;
  const investorBreakevenX = scaleX(investorBreakevenTTT) + padding.left;
  
  // Calculate Y positions for breakeven intersections
  const syndicatorBreakevenDataPoint = chartData.find(d => Math.abs(d.ttt - syndicatorBreakevenTTT) < maxTTT / 50) || chartData[0];
  const syndicatorBreakevenY = scaleY(syndicatorBreakevenDataPoint.leaseRevenueAfterNZTR) + padding.top;
  
  const investorBreakevenDataPoint = chartData.find(d => Math.abs(d.ttt - investorBreakevenTTT) < maxTTT / 50) || chartData[0];
  const investorBreakevenY = scaleY(investorBreakevenDataPoint.leaseRevenue) + padding.top;
  
  return (
    <div className="w-full overflow-x-auto -mx-2 px-2">
      <svg
        width={width}
        height={height}
        className="w-full h-auto max-w-full"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = padding.top + ratio * chartHeight;
          return (
            <line
              key={`grid-y-${ratio}`}
              x1={padding.left}
              y1={y}
              x2={width - padding.right}
              y2={y}
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth={1}
            />
          );
        })}
        
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const x = padding.left + ratio * chartWidth;
          return (
            <line
              key={`grid-x-${ratio}`}
              x1={x}
              y1={padding.top}
              x2={x}
              y2={height - padding.bottom}
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth={1}
            />
          );
        })}
        
        {/* Dotted lines from axes to syndicator breakeven intersection */}
        <line
          x1={padding.left}
          y1={syndicatorBreakevenY}
          x2={syndicatorBreakevenX}
          y2={syndicatorBreakevenY}
          stroke="#60a5fa"
          strokeWidth={1}
          strokeDasharray="2 3"
          opacity={0.4}
        />
        <line
          x1={syndicatorBreakevenX}
          y1={syndicatorBreakevenY}
          x2={syndicatorBreakevenX}
          y2={height - padding.bottom}
          stroke="#60a5fa"
          strokeWidth={1}
          strokeDasharray="2 3"
          opacity={0.4}
        />
        
        {/* Dotted lines from axes to investor breakeven intersection */}
        <line
          x1={padding.left}
          y1={investorBreakevenY}
          x2={investorBreakevenX}
          y2={investorBreakevenY}
          stroke="#d4a964"
          strokeWidth={1}
          strokeDasharray="2 3"
          opacity={0.4}
        />
        <line
          x1={investorBreakevenX}
          y1={investorBreakevenY}
          x2={investorBreakevenX}
          y2={height - padding.bottom}
          stroke="#d4a964"
          strokeWidth={1}
          strokeDasharray="2 3"
          opacity={0.4}
        />
        
        {/* Axes */}
        <line
          x1={padding.left}
          y1={height - padding.bottom}
          x2={width - padding.right}
          y2={height - padding.bottom}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth={2}
        />
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={height - padding.bottom}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth={2}
        />
        
        {/* No-lease line */}
        <path
          d={noLeasePath}
          fill="none"
          stroke="#f87171"
          strokeWidth={3}
        />
        
        {/* Lease line (before NZTR) */}
        <path
          d={leasePath}
          fill="none"
          stroke="#d4a964"
          strokeWidth={3}
        />
        
        {/* Lease line (after NZTR deductions) */}
        <path
          d={leaseAfterNZTRPath}
          fill="none"
          stroke="#60a5fa"
          strokeWidth={3}
        />
        
        {/* Line labels at right edge */}
        {/* Blue line (Lease Net) label at end */}
        <text
          x={width - padding.right + 10}
          y={scaleY(chartData[chartData.length - 1].leaseRevenueAfterNZTR) + padding.top - 4}
          fill="#60a5fa"
          fontSize="13"
          fontWeight="600"
          textAnchor="start"
        >
          <tspan x={width - padding.right + 10} dy="0">Owner/Syndicator</tspan>
          <tspan x={width - padding.right + 10} dy="1.2em">Breakeven</tspan>
        </text>
        
        {/* Gold line (Lease Gross) label at end */}
        <text
          x={width - padding.right + 10}
          y={scaleY(chartData[chartData.length - 1].leaseRevenue) + padding.top - 4}
          fill="#d4a964"
          fontSize="13"
          fontWeight="600"
          textAnchor="start"
        >
          <tspan x={width - padding.right + 10} dy="0">Investor</tspan>
          <tspan x={width - padding.right + 10} dy="1.2em">Breakeven</tspan>
        </text>
        
        {/* Red line (No Lease) label at end */}
        <text
          x={width - padding.right + 10}
          y={scaleY(chartData[chartData.length - 1].noLeaseRevenue) + padding.top + 4}
          fill="#f87171"
          fontSize="13"
          fontWeight="600"
          textAnchor="start"
        >
          No Lease
        </text>
        
        {/* X-axis labels - Syndicator Breakeven */}
        <line
          x1={syndicatorBreakevenX}
          y1={height - padding.bottom}
          x2={syndicatorBreakevenX}
          y2={height - padding.bottom + 5}
          stroke="#60a5fa"
          strokeWidth={1}
        />
        <text
          x={syndicatorBreakevenX}
          y={height - padding.bottom + 20}
          fill="#60a5fa"
          fontSize="13"
          fontWeight="600"
          textAnchor="middle"
        >
          {formatCurrencyXAxis(syndicatorBreakevenTTT)}
        </text>
        
        {/* X-axis labels - Investor Breakeven */}
        <line
          x1={investorBreakevenX}
          y1={height - padding.bottom}
          x2={investorBreakevenX}
          y2={height - padding.bottom + 5}
          stroke="#d4a964"
          strokeWidth={1}
        />
        <text
          x={investorBreakevenX}
          y={height - padding.bottom + 20}
          fill="#d4a964"
          fontSize="13"
          fontWeight="600"
          textAnchor="middle"
        >
          {formatCurrencyXAxis(investorBreakevenTTT)}
        </text>
        
        {/* Y-axis labels - Upfront Income (starting point) */}
        <line
          x1={padding.left}
          y1={scaleY(upfrontIncome) + padding.top}
          x2={padding.left - 5}
          y2={scaleY(upfrontIncome) + padding.top}
          stroke="rgba(255, 255, 255, 0.5)"
          strokeWidth={1}
        />
        <text
          x={padding.left - 10}
          y={scaleY(upfrontIncome) + padding.top + 4}
          fill="rgba(255, 255, 255, 0.7)"
          fontSize="13"
          fontWeight="600"
          textAnchor="end"
        >
          {formatCurrency(upfrontIncome)}
        </text>
        
        {/* Y-axis labels - Syndicator Breakeven Value */}
        <line
          x1={padding.left}
          y1={syndicatorBreakevenY}
          x2={padding.left - 5}
          y2={syndicatorBreakevenY}
          stroke="#60a5fa"
          strokeWidth={1}
        />
        <text
          x={padding.left - 10}
          y={syndicatorBreakevenY + 4}
          fill="#60a5fa"
          fontSize="13"
          fontWeight="600"
          textAnchor="end"
        >
          {formatCurrency(syndicatorBreakevenDataPoint.leaseRevenueAfterNZTR)}
        </text>
        
        {/* Y-axis labels - Investor Breakeven Value */}
        <line
          x1={padding.left}
          y1={investorBreakevenY}
          x2={padding.left - 5}
          y2={investorBreakevenY}
          stroke="#d4a964"
          strokeWidth={1}
        />
        <text
          x={padding.left - 10}
          y={investorBreakevenY + 4}
          fill="#d4a964"
          fontSize="13"
          fontWeight="600"
          textAnchor="end"
        >
          {formatCurrency(investorBreakevenDataPoint.leaseRevenue)}
        </text>
        
        {/* Axis titles */}
        <text
          x={width / 2}
          y={height - 10}
          fill="rgba(255, 255, 255, 0.6)"
          fontSize="14"
          textAnchor="middle"
        >
          Total Stakes For Duration of the Lease
        </text>
        <text
          x={20}
          y={height / 2}
          fill="rgba(255, 255, 255, 0.6)"
          fontSize="16"
          textAnchor="middle"
          transform={`rotate(-90, 20, ${height / 2})`}
        >
          Owner Return
        </text>
      </svg>
    </div>
  );
}

export default function ValuationPage() {
  const [inputs, setInputs] = useState<ValuationInputs>({
    ppp: 1000,
    sss: 10,
    ddd: 12,
    rrr: 25,
    nztrDeduction: 15,
  });
  
  // Pricing input mode toggles
  const [pricingPeriod, setPricingPeriod] = useState<'month' | 'year'>('year');
  const [pricingScope, setPricingScope] = useState<'per1percent' | 'total'>('per1percent');
  const [displayPrice, setDisplayPrice] = useState<string>('1000');
  
  const [errors, setErrors] = useState<Partial<Record<keyof ValuationInputs, string>>>({});
  
  // Calculate results based on breakeven point for display
  const results = useMemo(() => {
    try {
      const validated = valuationInputSchema.parse(inputs);
      return calculateValuation(validated);
    } catch (error) {
      return null;
    }
  }, [inputs]);
  
  const handleInputChange = (field: keyof ValuationInputs, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs((prev) => ({ ...prev, [field]: numValue }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };
  
  // Handle price input with conversions based on mode
  const handlePriceChange = (value: string) => {
    setDisplayPrice(value);
    const numValue = parseFloat(value) || 0;
    
    // Convert input to PPP (price per 1% per year)
    let pppValue = numValue;
    
    // Convert based on pricing period
    if (pricingPeriod === 'month') {
      pppValue = numValue * 12; // Convert monthly to yearly
    }
    
    // Convert based on pricing scope
    if (pricingScope === 'total') {
      pppValue = pppValue / inputs.sss; // Convert total to per 1%
    }
    
    setInputs((prev) => ({ ...prev, ppp: pppValue }));
    setErrors((prev) => ({ ...prev, ppp: undefined }));
  };
  
  // Update display price when toggles change
  const handlePricingModeChange = (period: 'month' | 'year', scope: 'per1percent' | 'total') => {
    setPricingPeriod(period);
    setPricingScope(scope);
    
    // Recalculate display price from PPP
    let displayValue = inputs.ppp;
    
    // Convert from yearly to period
    if (period === 'month') {
      displayValue = displayValue / 12;
    }
    
    // Convert from per 1% to scope
    if (scope === 'total') {
      displayValue = displayValue * inputs.sss;
    }
    
    setDisplayPrice(displayValue.toFixed(2));
  };
  
  const handleCalculate = () => {
    try {
      valuationInputSchema.parse(inputs);
      setErrors({});
    } catch (error) {
      // Ignore detailed field errors for now; just keep existing state.
    }
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-NZ', {
      style: 'currency',
      currency: 'NZD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  return (
    <Column
      fillWidth
      horizontal="center"
      paddingTop="l"
      paddingBottom="xl"
      style={{ minHeight: '100vh' }}
    >
      <Column maxWidth="l" paddingX="l" paddingY="l" gap="l">
        {/* Header Section */}
        <Column gap="m" marginBottom="m">
          <Badge
            background="brand-alpha-weak"
            paddingX="12"
            paddingY="4"
            onBackground="neutral-strong"
            textVariant="label-default-s"
            arrow={false}
          >
            VALUATION MODEL
          </Badge>
          <Heading as="h1" variant="display-strong-xl" wrap="balance">
            Lease Valuation Calculator
          </Heading>
          <Text variant="body-default-l" onBackground="neutral-weak" style={{ maxWidth: '40rem' }}>
            Calculate lease valuations, breakeven points, and compare leasing vs. retaining your stake.
          </Text>
        </Column>
        
        {/* Parameters above Graph */}
        <Column fillWidth gap="l">
          {/* Parameters Card */}
          <Column
            fillWidth
            padding="l"
            border="neutral-alpha-weak"
            radius="l"
            background="surface"
            gap="l"
            style={{ minWidth: '400px' }}
          >
            <Column gap="s" horizontal="center">
              <Heading as="h2" variant="heading-strong-xl">
                Parameters
              </Heading>
              <Line background="neutral-alpha-weak" />
            </Column>

            <Grid columns="3" gap="l" s={{ columns: '1' }}>
              {/* Stake & Duration */}
              <Column gap="m">
                <Row gap="m">
                  <Column gap="m" flex={1}>
                    <Text variant="label-strong-m" onBackground="neutral-strong">
                      Stake (%)
                    </Text>
                    <input
                      type="number"
                      value={inputs.sss || ''}
                      onChange={(e) => {
                        handleInputChange('sss', e.target.value);
                        if (pricingScope === 'total') {
                          const newSss = parseFloat(e.target.value) || 1;
                          let displayValue = inputs.ppp;
                          if (pricingPeriod === 'month') {
                            displayValue = displayValue / 12;
                          }
                          displayValue = displayValue * newSss;
                          setDisplayPrice(displayValue.toFixed(2));
                        }
                      }}
                      className="w-full px-4 py-3.5 bg-black/60 border border-white/[0.08] rounded-xl text-white text-xl font-semibold placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-black/70 transition-all text-center"
                      placeholder="10"
                      min="0"
                      max="100"
                      step="1"
                    />
                    {errors.sss && (
                      <p className="text-xs text-red-400">{errors.sss}</p>
                    )}
                    {!errors.sss && (
                      <Text variant="body-default-xs" onBackground="neutral-weak">
                        Investor distribution: {100 - inputs.rrr}%
                      </Text>
                    )}
                  </Column>

                  <Column gap="m" flex={1}>
                    <Text variant="label-strong-m" onBackground="neutral-strong">
                      Duration
                    </Text>
                    <div className="relative">
                      <input
                        type="number"
                        value={inputs.ddd || ''}
                        onChange={(e) => handleInputChange('ddd', e.target.value)}
                        className="w-full px-4 py-3.5 bg-black/60 border border-white/[0.08] rounded-xl text-white text-xl font-semibold placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-black/70 transition-all text-center"
                        placeholder="12"
                        min="1"
                        step="1"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/40 font-medium">mo</span>
                    </div>
                    {errors.ddd && (
                      <p className="text-xs text-red-400">{errors.ddd}</p>
                    )}
                  </Column>
                </Row>
              </Column>

              {/* Lease Price */}
              <Column gap="m">
                <Text variant="label-strong-m" onBackground="neutral-strong">
                  Lease price
                </Text>

                <Row gap="s">
                  <div className="flex gap-0 flex-1 bg-black/40 rounded-lg p-0.5 border border-white/[0.08]">
                    <button
                      type="button"
                      onClick={() => handlePricingModeChange('month', pricingScope)}
                      className={`flex-1 px-2.5 py-1.5 text-xs font-medium rounded-md transition-all ${
                        pricingPeriod === 'month'
                          ? 'bg-white text-black shadow-sm'
                          : 'text-white/60 hover:text-white/90'
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePricingModeChange('year', pricingScope)}
                      className={`flex-1 px-2.5 py-1.5 text-xs font-medium rounded-md transition-all ${
                        pricingPeriod === 'year'
                          ? 'bg-white text-black shadow-sm'
                          : 'text-white/60 hover:text-white/90'
                      }`}
                    >
                      Annual
                    </button>
                  </div>

                  <div className="flex gap-0 flex-1 bg-black/40 rounded-lg p-0.5 border border-white/[0.08]">
                    <button
                      type="button"
                      onClick={() => handlePricingModeChange(pricingPeriod, 'per1percent')}
                      className={`flex-1 px-2.5 py-1.5 text-xs font-medium rounded-md transition-all ${
                        pricingScope === 'per1percent'
                          ? 'bg-white text-black shadow-sm'
                          : 'text-white/60 hover:text-white/90'
                      }`}
                    >
                      Per 1%
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePricingModeChange(pricingPeriod, 'total')}
                      className={`flex-1 px-2.5 py-1.5 text-xs font-medium rounded-md transition-all ${
                        pricingScope === 'total'
                          ? 'bg-white text-black shadow-sm'
                          : 'text-white/60 hover:text-white/90'
                      }`}
                    >
                      Total
                    </button>
                  </div>
                </Row>

                <div className="relative w-full">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/50">
                    $
                  </span>
                  <input
                    type="number"
                    value={displayPrice}
                    onChange={(e) => handlePriceChange(e.target.value)}
                    className="w-full pl-7 pr-4 py-3.5 bg-black/60 border border-white/[0.08] rounded-xl text-white text-xl font-semibold placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-black/70 transition-all"
                    placeholder="_,___"
                    min="0"
                    step="100"
                  />
                </div>
                {errors.ppp && (
                  <p className="text-xs text-red-400">{errors.ppp}</p>
                )}
              </Column>

              {/* Revenue Split + Calculate */}
              <Column gap="m">
                <Row gap="m">
                  <Column gap="m" flex={1}>
                    <Text variant="label-strong-m" onBackground="neutral-strong">
                      Syndicator
                    </Text>
                    <div className="relative">
                      <input
                        type="number"
                        value={inputs.rrr || ''}
                        onChange={(e) => handleInputChange('rrr', e.target.value)}
                        className="w-full px-4 py-3.5 bg-black/60 border border-white/[0.08] rounded-xl text-white text-xl font-semibold placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-black/70 transition-all text-center"
                        placeholder="25"
                        min="0"
                        max="100"
                        step="1"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/40 font-medium">%</span>
                    </div>
                    {errors.rrr && (
                      <p className="text-xs text-red-400">{errors.rrr}</p>
                    )}
                  </Column>

                  <Column gap="m" flex={1}>
                    <Text variant="label-strong-m" onBackground="neutral-strong">
                      Less NZTR deductions
                    </Text>
                    <div className="relative">
                      <input
                        type="number"
                        value={inputs.nztrDeduction || ''}
                        onChange={(e) => handleInputChange('nztrDeduction', e.target.value)}
                        className="w-full px-4 py-3.5 bg-black/60 border border-white/[0.08] rounded-xl text-white text-xl font-semibold placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-black/70 transition-all text-center"
                        placeholder="15"
                        min="0"
                        max="100"
                        step="1"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/40 font-medium">%</span>
                    </div>
                    {errors.nztrDeduction && (
                      <p className="text-xs text-red-400">{errors.nztrDeduction}</p>
                    )}
                  </Column>
                </Row>

                <Button
                  onClick={handleCalculate}
                  variant="primary"
                  size="m"
                  fillWidth
                  label="Calculate"
                />
              </Column>
            </Grid>
          </Column>

          {/* Breakeven Analysis Card */}
          <Column
            fillWidth
            padding="l"
            border="neutral-alpha-weak"
            radius="xl"
            background="surface"
            gap="l"
            style={{ minHeight: '540px' }}
          >
            <Column gap="s" horizontal="center">
              <Heading as="h2" variant="heading-strong-xl">
                Breakeven Analysis
              </Heading>
              <Line background="neutral-alpha-weak" />
            </Column>

            {results ? (
              <BreakevenChart
                chartData={results.chartData}
                syndicatorBreakevenTTT={results.syndicatorBreakevenTTT}
                investorBreakevenTTT={results.investorBreakevenTTT}
                upfrontIncome={results.upfrontIncome}
              />
            ) : (
              <Column fillWidth minHeight={400} vertical="center" horizontal="center">
                <Text variant="body-default-m" onBackground="neutral-weak">
                  Enter parameters and click Calculate to see the breakeven analysis
                </Text>
              </Column>
            )}
          </Column>
        </Column>
        
        {/* Results Section */}
        {results && (
          <Column fillWidth gap="l">
            <Column
              fillWidth
              padding="l"
              border="neutral-alpha-weak"
              radius="l"
              background="surface"
              gap="l"
            >
              <Heading as="h2" variant="heading-strong-l">
                Results
              </Heading>
              
              {/* Key Metrics */}
              <Grid columns="2" gap="l" s={{ columns: '1' }}>
                <Column gap="s">
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    Risk-free income
                  </Text>
                  <Heading as="h3" variant="display-strong-l">
                    {formatCurrency(results.upfrontIncome)}
                  </Heading>
                  <Text variant="body-default-xs" onBackground="neutral-weak">
                    Lease income over {inputs.ddd} months, paid regardless of results.
                  </Text>
                </Column>
                
                <Column gap="s">
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    Breakeven stakes
                  </Text>
                  <Heading as="h3" variant="display-strong-l" style={{ color: '#60a5fa' }}>
                    {formatCurrency(results.syndicatorBreakevenTTT)}
                  </Heading>
                  <Text variant="body-default-xs" onBackground="neutral-weak">
                    Total stakes won before the owner or syndicator is worse off for entering into the lease.
                  </Text>
                </Column>
              </Grid>

              {/* Insights */}
              <Column fillWidth gap="m" paddingTop="l" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <Text variant="heading-strong-s">
                  Key Insights
                </Text>
                <Grid columns="2" gap="m" s={{ columns: '1' }}>
                  <Row gap="m">
                    <div style={{ width: '4px', background: '#d4a964', borderRadius: '2px' }}></div>
                    <Column gap="s">
                      <Text variant="body-default-s" onBackground="neutral-strong">
                        Risk-free income
                      </Text>
                      <Text variant="body-default-xs" onBackground="neutral-weak">
                        Lease income of {formatCurrency(results.upfrontIncome)} is paid regardless of results.
                      </Text>
                    </Column>
                  </Row>

                  <Row gap="m">
                    <div style={{ width: '4px', background: '#60a5fa', borderRadius: '2px' }}></div>
                    <Column gap="s">
                      <Text variant="body-default-s" onBackground="neutral-strong">
                        Breakeven stakes
                      </Text>
                      <Text variant="body-default-xs" onBackground="neutral-weak">
                        Owner or syndicator is better off leasing up to {formatCurrency(results.syndicatorBreakevenTTT)} in total stakes won.
                      </Text>
                    </Column>
                  </Row>
                </Grid>
              </Column>
            </Column>
          </Column>
        )}
      </Column>
    </Column>
  );
}

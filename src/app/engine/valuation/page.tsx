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
  breakevenTTT: number;
  breakevenWWW: number;
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
  
  // SYNDICATOR BREAKEVEN (Net): Where lease after NZTR equals no-lease
  // Syndicator perspective: Upfront + 0.10w vs 1.00w
  // Breakeven TTT* = [100 × PPP × (DDD/12)] / (1 - netRRR/100)
  const syndicatorBreakevenTTT = (100 * ppp * (ddd / 12)) / (1 - netRRR / 100);
  const syndicatorBreakevenWWW = (sss / 100) * syndicatorBreakevenTTT;
  
  // INVESTOR BREAKEVEN (Gross): Where lease gross equals no-lease
  // Investor perspective: -Upfront + 0.75w (breaks even when upfront recovered)
  // Or equivalently: where syndicator gets Upfront + 0.25w = 1.00w
  // Breakeven TTT* = [100 × PPP × (DDD/12)] / (1 - rrr/100)
  const investorBreakevenTTT = (100 * ppp * (ddd / 12)) / (1 - rrr / 100);
  const investorBreakevenWWW = (sss / 100) * investorBreakevenTTT;
  
  // Calculate syndicator returns at syndicator breakeven (using net rate)
  const ownerReturnLease = upfrontIncome + (netRRR / 100) * syndicatorBreakevenWWW;
  const ownerReturnNoLease = syndicatorBreakevenWWW;
  
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
    
    // No-lease line: starts at (0,0) with slope SSS/100
    // This represents owner's share of total winnings (100% of their stake)
    const noLeaseRevenue = (sss / 100) * tttValue;
    
    // Lease line: starts at upfront value with slope (RRR × SSS/100)
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
  const padding = { top: 50, right: 50, bottom: 70, left: 90 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  const maxTTT = Math.max(...chartData.map(d => d.ttt));
  const maxRevenue = Math.max(
    ...chartData.map(d => Math.max(d.leaseRevenue, d.leaseRevenueAfterNZTR, d.noLeaseRevenue))
  );
  
  const scaleX = (ttt: number) => (ttt / maxTTT) * chartWidth;
  const scaleY = (revenue: number) => chartHeight - (revenue / maxRevenue) * chartHeight;
  
  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
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
          strokeWidth={2}
        />
        
        {/* Lease line (before NZTR) */}
        <path
          d={leasePath}
          fill="none"
          stroke="#d4a964"
          strokeWidth={2}
        />
        
        {/* Lease line (after NZTR deductions) */}
        <path
          d={leaseAfterNZTRPath}
          fill="none"
          stroke="#60a5fa"
          strokeWidth={2}
          strokeDasharray="4 4"
        />
        
        {/* Syndicator Breakeven label */}
        <text
          x={syndicatorBreakevenX}
          y={padding.top - 10}
          fill="#60a5fa"
          fontSize="12"
          fontWeight="600"
          textAnchor="middle"
        >
          Syndicator
        </text>
        
        {/* Investor Breakeven label */}
        <text
          x={investorBreakevenX}
          y={padding.top - 10}
          fill="#d4a964"
          fontSize="12"
          fontWeight="600"
          textAnchor="middle"
        >
          Investor
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
          fontSize="11"
          fontWeight="600"
          textAnchor="middle"
        >
          {formatCurrency(syndicatorBreakevenTTT)}
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
          fontSize="11"
          fontWeight="600"
          textAnchor="middle"
        >
          {formatCurrency(investorBreakevenTTT)}
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
          fontSize="11"
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
          fontSize="11"
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
          fontSize="11"
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
          fontSize="12"
          textAnchor="middle"
        >
          Total Winnings (TTT)
        </text>
        <text
          x={20}
          y={height / 2}
          fill="rgba(255, 255, 255, 0.6)"
          fontSize="12"
          textAnchor="middle"
          transform={`rotate(-90, 20, ${height / 2})`}
        >
          Owner Return
        </text>
      </svg>
      
      {/* Legend */}
      <div className="flex gap-6 mt-4 justify-center flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-[#d4a964]"></div>
          <span className="text-sm text-white/60">Lease Model (Gross 25%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-[#60a5fa] border-t-2 border-dashed border-[#60a5fa]" style={{ borderStyle: 'dashed', borderTopWidth: '2px', height: '0' }}></div>
          <span className="text-sm text-white/60">Lease Model (Net 10%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-[#f87171]"></div>
          <span className="text-sm text-white/60">No Lease Model</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-[#d4a964]" style={{ borderTopStyle: 'dashed', borderTopWidth: '2px', height: '0' }}></div>
          <span className="text-sm text-white/60">Investor Breakeven</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-[#60a5fa]" style={{ borderTopStyle: 'dashed', borderTopWidth: '2px', height: '0' }}></div>
          <span className="text-sm text-white/60">Syndicator Breakeven</span>
        </div>
      </div>
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
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof ValuationInputs, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ValuationInputs] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
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
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof ValuationInputs, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ValuationInputs] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
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
    <Column fillWidth horizontal="center" paddingTop="xl" paddingBottom="xl" minHeight="100vh">
      <Column maxWidth="l" paddingX="l" paddingY="xl" gap="xl">
        {/* Header Section */}
        <Column gap="m" marginBottom="l">
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
          <Text variant="body-default-l" onBackground="neutral-weak" maxWidth="40">
            Calculate lease valuations, breakeven points, and compare leasing vs. retaining your stake.
          </Text>
        </Column>
        
        {/* Main Layout - Graph and Input Sidebar */}
        <Row
          fillWidth
          gap="l"
          wrap
          s={{ direction: 'column' }}
        >
          {/* Main Area - Graph */}
          <Column flex={2} minWidth="360" gap="m">
            <Column
              fillWidth
              padding="l"
              border="neutral-alpha-weak"
              radius="l"
              background="surface"
            >
              <Heading as="h2" variant="heading-strong-l" marginBottom="m">
                Breakeven Analysis
              </Heading>
              {results ? (
                <BreakevenChart
                  chartData={results.chartData}
                  syndicatorBreakevenTTT={results.syndicatorBreakevenTTT}
                  investorBreakevenTTT={results.investorBreakevenTTT}
                  upfrontIncome={results.upfrontIncome}
                />
              ) : (
                <Column fillWidth minHeight="400" vertical="center" horizontal="center">
                  <Text variant="body-default-m" onBackground="neutral-weak">
                    Enter parameters and click Calculate to see the breakeven analysis
                  </Text>
                </Column>
              )}
            </Column>
          </Column>
          
          {/* Sidebar - Input Parameters */}
          <Column
            flex={1}
            minWidth="280"
            gap="m"
            position="sticky"
            style={{ top: '100px' }}
          >
            <Column
              fillWidth
              padding="l"
              border="neutral-alpha-weak"
              radius="l"
              background="surface"
              gap="l"
            >
              <Heading as="h2" variant="heading-strong-l">
                Input Parameters
              </Heading>
              
              <Column gap="m">
                {/* PPP: Price with flexible input modes */}
                <Column gap="s">
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    Lease Price
                  </Text>
                  
                  {/* Toggle buttons for pricing period */}
                  <div className="flex gap-2 mb-3">
                    <button
                      type="button"
                      onClick={() => handlePricingModeChange('month', pricingScope)}
                      className={`flex-1 px-3 py-2 text-xs rounded-lg transition-colors ${
                        pricingPeriod === 'month'
                          ? 'bg-white/10 text-white border border-white/20'
                          : 'bg-black/30 text-white/50 border border-white/[0.06] hover:bg-white/5'
                      }`}
                    >
                      Per Month
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePricingModeChange('year', pricingScope)}
                      className={`flex-1 px-3 py-2 text-xs rounded-lg transition-colors ${
                        pricingPeriod === 'year'
                          ? 'bg-white/10 text-white border border-white/20'
                          : 'bg-black/30 text-white/50 border border-white/[0.06] hover:bg-white/5'
                      }`}
                    >
                      Per Year
                    </button>
                  </div>
                  
                  {/* Toggle buttons for pricing scope */}
                  <div className="flex gap-2 mb-3">
                    <button
                      type="button"
                      onClick={() => handlePricingModeChange(pricingPeriod, 'per1percent')}
                      className={`flex-1 px-3 py-2 text-xs rounded-lg transition-colors ${
                        pricingScope === 'per1percent'
                          ? 'bg-white/10 text-white border border-white/20'
                          : 'bg-black/30 text-white/50 border border-white/[0.06] hover:bg-white/5'
                      }`}
                    >
                      Per 1%
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePricingModeChange(pricingPeriod, 'total')}
                      className={`flex-1 px-3 py-2 text-xs rounded-lg transition-colors ${
                        pricingScope === 'total'
                          ? 'bg-white/10 text-white border border-white/20'
                          : 'bg-black/30 text-white/50 border border-white/[0.06] hover:bg-white/5'
                      }`}
                    >
                      Total Lease
                    </button>
                  </div>
                  
                  <input
                    type="number"
                    value={displayPrice}
                    onChange={(e) => handlePriceChange(e.target.value)}
                    className="w-full px-4 py-2.5 bg-black/50 border border-white/[0.06] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/[0.12] transition-colors"
                    placeholder="1000"
                    min="0"
                    step="100"
                  />
                  <p className="mt-2 text-xs text-white/40">
                    {pricingPeriod === 'month' ? 'Monthly' : 'Yearly'} price {pricingScope === 'per1percent' ? 'per 1% stake' : `for ${inputs.sss}% total stake`}
                  </p>
                  {errors.ppp && (
                    <p className="mt-1 text-xs text-red-400">{errors.ppp}</p>
                  )}
                </Column>
                
                {/* SSS: Stake sold (%) */}
                <Column gap="s">
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    SSS: Stake sold (%)
                  </Text>
                  <input
                    type="number"
                    value={inputs.sss || ''}
                    onChange={(e) => {
                      handleInputChange('sss', e.target.value);
                      // Recalculate display price if in total mode
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
                    className="w-full px-4 py-2.5 bg-black/50 border border-white/[0.06] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/[0.12] transition-colors"
                    placeholder="10"
                    min="0"
                    max="100"
                    step="1"
                  />
                  {errors.sss && (
                    <p className="mt-1 text-xs text-red-400">{errors.sss}</p>
                  )}
                </Column>
                
                {/* DDD: Duration (months) */}
                <Column gap="s">
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    DDD: Duration (months)
                  </Text>
                  <input
                    type="number"
                    value={inputs.ddd || ''}
                    onChange={(e) => handleInputChange('ddd', e.target.value)}
                    className="w-full px-4 py-2.5 bg-black/50 border border-white/[0.06] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/[0.12] transition-colors"
                    placeholder="12"
                    min="1"
                    step="1"
                  />
                  {errors.ddd && (
                    <p className="mt-1 text-xs text-red-400">{errors.ddd}</p>
                  )}
                </Column>
                
                {/* RRR: Syndicator share of stakes (%) */}
                <Column gap="s">
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    RRR: Syndicator share of winnings (%)
                  </Text>
                  <input
                    type="number"
                    value={inputs.rrr || ''}
                    onChange={(e) => handleInputChange('rrr', e.target.value)}
                    className="w-full px-4 py-2.5 bg-black/50 border border-white/[0.06] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/[0.12] transition-colors"
                    placeholder="25"
                    min="0"
                    max="100"
                    step="1"
                  />
                  <p className="mt-2 text-xs text-white/40">
                    Syndicator's % of stakes earnings (before NZTR)
                  </p>
                  {errors.rrr && (
                    <p className="mt-1 text-xs text-red-400">{errors.rrr}</p>
                  )}
                </Column>
                
                {/* NZTR Deduction (%) */}
                <Column gap="s">
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    NZTR Deduction (%)
                  </Text>
                  <input
                    type="number"
                    value={inputs.nztrDeduction || ''}
                    onChange={(e) => handleInputChange('nztrDeduction', e.target.value)}
                    className="w-full px-4 py-2.5 bg-black/50 border border-white/[0.06] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/[0.12] transition-colors"
                    placeholder="15"
                    min="0"
                    max="100"
                    step="1"
                  />
                  <p className="mt-2 text-xs text-white/40">
                    NZTR takes this % from owner's winnings share
                  </p>
                  {errors.nztrDeduction && (
                    <p className="mt-1 text-xs text-red-400">{errors.nztrDeduction}</p>
                  )}
                </Column>
                
                <Button
                  onClick={handleCalculate}
                  variant="primary"
                  size="m"
                  fillWidth
                  label="Calculate"
                />
              </Column>
            </Column>
          </Column>
        </Row>
        
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
              <Grid columns="2" mobileColumns="1" gap="l">
                <Column gap="s">
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    Upfront Income
                  </Text>
                  <Heading as="h3" variant="display-strong-l">
                    {formatCurrency(results.upfrontIncome)}
                  </Heading>
                  <Text variant="body-default-xs" onBackground="neutral-weak">
                    Guaranteed payment over {inputs.ddd} months
                  </Text>
                </Column>
                
                <Column gap="s">
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    Syndicator Return at Breakeven
                  </Text>
                  <Heading as="h3" variant="display-strong-l" style={{ color: '#60a5fa' }}>
                    {formatCurrency(results.ownerReturnLease)}
                  </Heading>
                  <Text variant="body-default-xs" onBackground="neutral-weak">
                    Net return after NZTR deductions
                  </Text>
                </Column>
              </Grid>

              {/* Breakeven Points */}
              <Column
                fillWidth
                padding="l"
                border="neutral-alpha-weak"
                radius="m"
                gap="l"
              >
                <Text variant="heading-strong-s">
                  Breakeven Points
                </Text>
                <Grid columns="2" mobileColumns="1" gap="l">
                  <Row gap="m">
                    <div style={{ width: '4px', background: '#60a5fa', borderRadius: '2px' }}></div>
                    <Column flex={1} gap="s">
                      <Text variant="body-default-m" style={{ color: '#60a5fa' }}>
                        Syndicator Breakeven
                      </Text>
                      <Heading as="h4" variant="heading-strong-xl">
                        {formatCurrency(results.syndicatorBreakevenTTT)}
                      </Heading>
                      <Text variant="body-default-xs" onBackground="neutral-weak">
                        Where lease <Text as="span" style={{ color: '#60a5fa' }}>after NZTR</Text> (10% net) equals no-lease. Below this, leasing is better.
                      </Text>
                    </Column>
                  </Row>
                  
                  <Row gap="m">
                    <div style={{ width: '4px', background: '#d4a964', borderRadius: '2px' }}></div>
                    <Column flex={1} gap="s">
                      <Text variant="body-default-m" style={{ color: '#d4a964' }}>
                        Investor Breakeven
                      </Text>
                      <Heading as="h4" variant="heading-strong-xl">
                        {formatCurrency(results.investorBreakevenTTT)}
                      </Heading>
                      <Text variant="body-default-xs" onBackground="neutral-weak">
                        Where lease <Text as="span" style={{ color: '#d4a964' }}>before NZTR</Text> (25% gross) equals no-lease. The gap shows NZTR impact.
                      </Text>
                    </Column>
                  </Row>
                </Grid>
              </Column>

              {/* Insights */}
              <Column fillWidth gap="m" paddingTop="l" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <Text variant="heading-strong-s">
                  Key Insights
                </Text>
                <Grid columns="3" mobileColumns="1" gap="m">
                  <Row gap="m">
                    <div style={{ width: '4px', background: '#60a5fa', borderRadius: '2px' }}></div>
                    <Column gap="s">
                      <Text variant="body-default-s" onBackground="neutral-strong">
                        Syndicator Perspective
                      </Text>
                      <Text variant="body-default-xs" onBackground="neutral-weak">
                        Leasing outperforms full ownership for winnings under {formatCurrency(results.syndicatorBreakevenTTT)} (after NZTR deductions), providing fixed income while transferring performance risk.
                      </Text>
                    </Column>
                  </Row>
                  
                  <Row gap="m">
                    <div style={{ width: '4px', background: '#d4a964', borderRadius: '2px' }}></div>
                    <Column gap="s">
                      <Text variant="body-default-s" onBackground="neutral-strong">
                        Guaranteed Income
                      </Text>
                      <Text variant="body-default-xs" onBackground="neutral-weak">
                        Secure fixed payments of {formatCurrency(results.upfrontIncome)} over {inputs.ddd} months, independent of race outcomes.
                      </Text>
                    </Column>
                  </Row>
                  
                  <Row gap="m">
                    <div style={{ width: '4px', background: '#60a5fa', borderRadius: '2px' }}></div>
                    <Column gap="s">
                      <Text variant="body-default-s" onBackground="neutral-strong">
                        NZTR Impact
                      </Text>
                      <Text variant="body-default-xs" onBackground="neutral-weak">
                        NZTR deducts {inputs.nztrDeduction}% from winnings share, reducing net return from {inputs.rrr}% to {Math.max(0, inputs.rrr - inputs.nztrDeduction)}% of stakes earnings.
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

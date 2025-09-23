import React from 'react';
import { Badge } from '../ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

interface Mission {
  title: string;
  description: string;
  highlights: string[];
}

interface SupportFeature {
  name: string;
  description: string;
}

interface Support {
  title: string;
  description: string;
  features: SupportFeature[];
}

interface MissionComboProps {
  mission: Mission;
  support: Support;
}

export default function MissionCombo({ mission, support }: MissionComboProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Mission Section */}
      <Card>
        <CardHeader>
          <CardTitle>{mission.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            {mission.description}
          </p>
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900">Key Technologies:</h4>
            <div className="flex flex-wrap gap-2">
              {mission.highlights.map((highlight, index) => (
                <Badge key={index} variant="secondary">
                  {highlight}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support Section */}
      <Card>
        <CardHeader>
          <CardTitle>{support.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            {support.description}
          </p>
          <div className="grid gap-4">
            {support.features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h5 className="font-medium text-gray-900">{feature.name}</h5>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
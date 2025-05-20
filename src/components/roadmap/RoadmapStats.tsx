
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, CalendarDays } from 'lucide-react';

interface RoadmapStatsProps {
  totalFeatures: number;
  completedFeatures: number;
  inProgressFeatures: number;
  plannedFeatures: number;
  mostVotedFeature: string;
}

const RoadmapStats = ({ 
  totalFeatures, 
  completedFeatures, 
  inProgressFeatures, 
  plannedFeatures,
  mostVotedFeature
}: RoadmapStatsProps) => {
  // Calculate percentages
  const completedPercentage = Math.round((completedFeatures / totalFeatures) * 100);
  const inProgressPercentage = Math.round((inProgressFeatures / totalFeatures) * 100);
  const plannedPercentage = Math.round((plannedFeatures / totalFeatures) * 100);

  return (
    <div className="bg-gradient-to-br from-morocco-sand/20 to-white rounded-xl border border-morocco-sand/20 p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Features */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Features</h3>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold mr-2">{totalFeatures}</span>
            <span className="text-sm text-muted-foreground">planned or in development</span>
          </div>
        </div>
        
        {/* Status distribution */}
        <div className="col-span-2">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Development Status</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <Check size={14} className="text-green-600 mr-2" />
              <div className="w-full flex-1">
                <div className="flex justify-between text-xs mb-1">
                  <span>Completed</span>
                  <span>{completedFeatures} features ({completedPercentage}%)</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-green-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${completedPercentage}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <CalendarDays size={14} className="text-blue-600 mr-2" />
              <div className="w-full flex-1">
                <div className="flex justify-between text-xs mb-1">
                  <span>In Progress</span>
                  <span>{inProgressFeatures} features ({inProgressPercentage}%)</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-blue-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${inProgressPercentage}%` }}
                    transition={{ duration: 1, delay: 0.4 }}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <Clock size={14} className="text-amber-600 mr-2" />
              <div className="w-full flex-1">
                <div className="flex justify-between text-xs mb-1">
                  <span>Planned</span>
                  <span>{plannedFeatures} features ({plannedPercentage}%)</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-amber-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${plannedPercentage}%` }}
                    transition={{ duration: 1, delay: 0.6 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Most voted feature */}
        <div className="bg-white/70 rounded-lg p-4 border border-muted">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Most Requested</h3>
          <div className="text-lg font-semibold mb-1">{mostVotedFeature}</div>
          <div className="flex items-center text-xs text-morocco-clay">
            <ThumbsUp size={12} className="mr-1" />
            <span>Top voted by the community</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapStats;

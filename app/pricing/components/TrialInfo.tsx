import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift } from 'lucide-react';

export default function TrialInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="mb-8 bg-gradient-to-r from-teal-50 via-purple-50 to-yellow-50 border-blue-200 shadow-lg">
        <CardHeader className="flex flex-row items-center gap-2">
          <Gift className="h-5 w-5 text-yellow-500" />
          <CardTitle className="text-xl font-semibold text-blue-900">
            30-Day Free Trial
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            Try any selected plan with a 30-day free trial requiring only a £1
            verification fee. The full subscription payment will be deferred
            until the end of the trial period.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

import { describe, it, expect } from 'test/lib/common';

import { ThresholdMapper } from '../threshold_mapper';

describe('ThresholdMapper', () => {
  describe('with greater than evaluator', () => {
    it('can map query conditions to thresholds', () => {
      var panel: any = {
        type: 'graph',
        alert: {
          conditions: [
            {
              type: 'query',
              evaluator: { type: 'gt', params: [100] },
            },
          ],
        },
      };

      var updated = ThresholdMapper.alertToGraphThresholds(panel);
      expect(updated).toBe(true);
      expect(panel.thresholds[0].op).toBe('gt');
      expect(panel.thresholds[0].value).toBe(100);
    });
  });

  describe('with outside range evaluator', () => {
    it('can map query conditions to thresholds', () => {
      var panel: any = {
        type: 'graph',
        alert: {
          conditions: [
            {
              type: 'query',
              evaluator: { type: 'outside_range', params: [100, 200] },
            },
          ],
        },
      };

      var updated = ThresholdMapper.alertToGraphThresholds(panel);
      expect(updated).toBe(true);
      expect(panel.thresholds[0].op).toBe('lt');
      expect(panel.thresholds[0].value).toBe(100);

      expect(panel.thresholds[1].op).toBe('gt');
      expect(panel.thresholds[1].value).toBe(200);
    });
  });

  describe('with inside range evaluator', () => {
    it('can map query conditions to thresholds', () => {
      var panel: any = {
        type: 'graph',
        alert: {
          conditions: [
            {
              type: 'query',
              evaluator: { type: 'within_range', params: [100, 200] },
            },
          ],
        },
      };

      var updated = ThresholdMapper.alertToGraphThresholds(panel);
      expect(updated).toBe(true);
      expect(panel.thresholds[0].op).toBe('gt');
      expect(panel.thresholds[0].value).toBe(100);

      expect(panel.thresholds[1].op).toBe('lt');
      expect(panel.thresholds[1].value).toBe(200);
    });
  });
});

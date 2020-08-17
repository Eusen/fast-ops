import {ChangeLog} from "src/core/config/change-log/change-log";

export const changelog = ChangeLog.create({
  name: 'vue-ops',
  major: [
    {
      index: 1,
      current: [
        {
          index: 0,
          incremental: [
            {
              index: 0,
              newlyIncreased: [
                {
                  module: 'all',
                  description: '111111111',
                }
              ],
            }
          ]
        }
      ]
    }
  ]
});

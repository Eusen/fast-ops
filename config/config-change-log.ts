import {ChangeLog} from "src/core/config/change-log/change-log";

export const changelog = ChangeLog.create({
  name: 'fops',
  major: [
    {
      index: 1,
      current: [
        {
          index: 0,
          incremental: [
            {
              index: 0,
              feature: [
                {
                  target: 'all',
                  description: '111111111',
                }
              ],
            },
            {
              index: 1,
              docs: [
                {
                  target: '11231',
                  description: '23123123123',
                }
              ]
            }
          ]
        }
      ]
    }
  ]
});

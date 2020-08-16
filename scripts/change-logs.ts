import {createChangeLog} from "../src/core/change-log";

export default createChangeLog({
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

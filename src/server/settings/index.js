import R from 'ramda';
import development from './dev';
import common from './common';

const environments = {
  development,
};

export default function getSetting(path) {
  const config = R.mergeDeepRight(common, environments[process.env.NODE_ENV]);

  return R.path(path, config);
}

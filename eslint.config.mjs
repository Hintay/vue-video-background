import createConfig from '@antfu/eslint-config'

export default createConfig(
  {
    stylistic: true,
    ignores: ['demo/public'],
  },
)

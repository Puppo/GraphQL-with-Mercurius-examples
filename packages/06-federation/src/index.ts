import blogBoot from './blog/index'
import gatewayBoot from './gateway/index'
import userBoot from './users/index'

async function boot() {
  await blogBoot()
  await userBoot()
  await gatewayBoot()
}

boot()

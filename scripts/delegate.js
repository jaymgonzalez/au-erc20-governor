const { ethers } = require('hardhat')

const tokenAddress = '0x651A3603776bF03B3D98827Dd836672952489a7F'
// const tokenContract = require('../artifacts/contracts/MyToken.sol/MyToken.json')
// const governorAddress = '0x59e4DC88ffe07c5EDBfe39f173E2343C3B5C3Abb'

async function main() {
  const [owner] = await ethers.getSigners()

  const token = await ethers.getContractAt('MyToken', tokenAddress)
  // await token.deployed()
  // const governor = ethers.getContractAt('MyGovernor', governorAddress)

  // console.log(await token.delegate(owner.address))

  const delegateTx = await token.delegate(owner.address)

  console.log(`Tx hash: ${delegateTx.hash}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

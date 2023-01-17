const { ethers } = require('hardhat')
const { parseEther, keccak256, toUtf8Bytes } = ethers.utils

const tokenAddress = '0x651A3603776bF03B3D98827Dd836672952489a7F'
const governorAddress = '0x59e4DC88ffe07c5EDBfe39f173E2343C3B5C3Abb'
// const proposalId =
//   '74603036112882048532149772112803211574878414469951030874512815587708688440713'

async function main() {
  const [owner] = await ethers.getSigners()

  const token = await ethers.getContractAt('MyToken', tokenAddress)
  const governor = await ethers.getContractAt('MyGovernor', governorAddress)

  const executeTx = await governor.execute(
    [token.address],
    [0],
    [
      token.interface.encodeFunctionData('mint', [
        owner.address,
        parseEther('25000'),
      ]),
    ],
    keccak256(toUtf8Bytes('Give the owner more tokens!'))
  )

  console.log(executeTx)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

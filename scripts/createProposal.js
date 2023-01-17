const { ethers } = require('hardhat')
const { parseEther } = ethers.utils

const tokenAddress = '0x651A3603776bF03B3D98827Dd836672952489a7F'
const governorAddress = '0x59e4DC88ffe07c5EDBfe39f173E2343C3B5C3Abb'

async function main() {
  const [owner] = await ethers.getSigners()

  const token = await ethers.getContractAt('MyToken', tokenAddress)
  const governor = await ethers.getContractAt('MyGovernor', governorAddress)

  const tx = await governor.propose(
    [token.address],
    [0],
    [
      token.interface.encodeFunctionData('mint', [
        owner.address,
        parseEther('25000'),
      ]),
    ],
    'Give the owner more tokens!'
  )
  const receipt = await tx.wait()
  const event = receipt.events.find((x) => x.event === 'ProposalCreated')
  const { proposalId } = event.args

  console.log(`Proposal created with ID: ${proposalId}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

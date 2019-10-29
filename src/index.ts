import { prisma } from '../generated/prisma-client'

async function main() {

  const newUser = await prisma.createUser({
    name: 'Alice',
    email: `alice@localhost${Math.random()}`,
    posts: {
      create: { title: 'The data layer for modern apps' }
    },
    widgets: {
      create: { name: 'Cool Widget' }
    }
  })
  console.log(`Created new user: ${newUser.name} (ID: ${newUser.id})`)

  const [ users, posts, widgets ] = await Promise.all([
    prisma.users(), prisma.posts(), prisma.widgets()
  ])

  console.log('\nAll users:\n', users)
  console.log('\nAll posts:\n', posts)
  console.log('\nAll widgets:\n', widgets)
}

main().catch(console.error)
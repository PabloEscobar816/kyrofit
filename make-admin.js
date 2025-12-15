const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    const email = 'roguelink32@gmail.com'

    try {
        const user = await prisma.user.update({
            where: { email: email },
            data: { role: 'ADMIN' },
        })
        console.log(`Success! User ${user.email} is now an ADMIN.`)
    } catch (error) {
        console.error(`Error: Could not find user with email ${email}. Did you sign up yet?`)
        console.error(error)
    } finally {
        await prisma.$disconnect()
    }
}

main()

const { PrismaClient } = require('@prisma/client')
const { ObjectId } = require('mongodb')

const prisma = new PrismaClient()
// here add user that you want to create
// const HARDCODED_USERS = []

async function main() {
  // Création de l'admin
  await prisma.user.create({
    data: {
      email: 'admin@odalys-vacances.com',
      password: 'sk-proj-admin-secure-key-12345 ',
      role: 'admin',
      chats: {
        create: {
          id: new ObjectId().toHexString(),
          messages: {
            create: {
              id: new ObjectId().toHexString(),
              content: "Message initial de l'administration"
            }
          }
        }
      }
    }
  })
  // Création des utilisateurs avec rôle 'user'
  // for (const user of HARDCODED_USERS) {
  //   try {
  //     await prisma.user.create({
  //       data: {
  //         email: user.email,
  //         password: user.password,
  //         role: 'user', // Défini explicitement
  //         chats: {
  //           create: {
  //             id: new ObjectId().toHexString(),
  //             messages: {
  //               create: {
  //                 id: new ObjectId().toHexString(),
  //                 content: `Premier message de ${user.email.split('@')[0]}`
  //               }
  //             }
  //           }
  //         }
  //       }
  //     })
  //     console.log(`✅ ${user.email} créé`)
  //   } catch (error) {
  //     console.error(`❌ Erreur avec ${user.email}:`, error)
  //   }
  // }
}

main()
  .then(() => console.log('\n🎉 Seed terminé !'))
  .catch((e) => {
    console.error('\n🔥 Erreur lors du seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

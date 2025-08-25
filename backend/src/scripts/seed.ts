import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../utils/password';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminPasswordHash = await hashPassword('admin123');
  const admin = await prisma.user.upsert({
    where: { email: 'admin@stb.com.tn' },
    update: {},
    create: {
      email: 'admin@stb.com.tn',
      passwordHash: adminPasswordHash,
      fullName: 'System Administrator',
      firstName: 'System',
      lastName: 'Administrator',
      role: 'ADMIN',
      status: 'ACTIVE',
      isVerified: true
    }
  });

  // Create test admin user
  const testAdminPasswordHash = await hashPassword('test123');
  const testAdmin = await prisma.user.upsert({
    where: { email: 'test@admin.com' },
    update: {},
    create: {
      email: 'test@admin.com',
      passwordHash: testAdminPasswordHash,
      fullName: 'Test Administrator',
      firstName: 'Test',
      lastName: 'Administrator',
      role: 'ADMIN',
      status: 'ACTIVE',
      isVerified: true
    }
  });

  // Create client users
  const clientPasswordHash = await hashPassword('password123');
  
  const client1 = await prisma.user.upsert({
    where: { email: 'hichem@example.com' },
    update: {},
    create: {
      email: 'hichem@example.com',
      passwordHash: clientPasswordHash,
      fullName: 'Hichem Latrach',
      firstName: 'Hichem',
      lastName: 'Latrach',
      cinNumber: '12345678',
      phoneNumber: '+21655604103',
      role: 'CLIENT',
      status: 'ACTIVE',
      isVerified: true
    }
  });

  const client2 = await prisma.user.upsert({
    where: { email: 'sarah@example.com' },
    update: {},
    create: {
      email: 'sarah@example.com',
      passwordHash: clientPasswordHash,
      fullName: 'Sarah Ben Ali',
      firstName: 'Sarah',
      lastName: 'Ben Ali',
      cinNumber: '87654321',
      phoneNumber: '+21698765432',
      role: 'CLIENT',
      status: 'ACTIVE',
      isVerified: true
    }
  });

  const client3 = await prisma.user.upsert({
    where: { email: 'mohamed@example.com' },
    update: {},
    create: {
      email: 'mohamed@example.com',
      passwordHash: clientPasswordHash,
      fullName: 'Mohamed Trabelsi',
      firstName: 'Mohamed',
      lastName: 'Trabelsi',
      cinNumber: '11223344',
      phoneNumber: '+21622334455',
      role: 'CLIENT',
      status: 'ACTIVE',
      isVerified: true
    }
  });

  // Create KYC information for clients
  await prisma.kycInfo.upsert({
    where: { userId: client1.id },
    update: {},
    create: {
      userId: client1.id,
      title: 'Mr. Hichem Latrach',
      countryOfBirth: 'Tunisia',
      dateOfBirth: new Date('2003-08-31'),
      address: 'Manar 2, Tunis',
      reason: 'Account creation',
      relationshipType: 'Savings',
      status: 'Individual',
      natureOfActivity: 'Student / Private',
      primaryNationality: 'Tunisian',
      otherNationality: '—',
      motherFullName: 'Foulen ben Foulen',
      fatherFullName: 'Foulen ben Foulen',
      maritalStatus: 'Single',
      residence: 'Resident in Tunisia',
      cinNumber: '12345678',
      dateOfIssue: new Date('2020-10-10'),
      selectedAgencyNumber: '103',
      accountType: 'Special Savings Card Account',
      accountCurrency: 'TND'
    }
  });

  // Create accounts for clients
  const account1 = await prisma.account.upsert({
    where: { rib: '6191235965412365' },
    update: {},
    create: {
      userId: client1.id,
      rib: '6191235965412365',
      iban: 'TN59 6191 2359 6541 2365',
      type: 'Carte Epargne',
      balance: 3250.00,
      status: 'ACTIVE',
      number: '6191235965412365',
      overdraftAuthorized: 0
    }
  });

  const account2 = await prisma.account.upsert({
    where: { rib: '6191548216544215' },
    update: {},
    create: {
      userId: client1.id,
      rib: '6191548216544215',
      iban: 'TN59 6191 5482 1654 4215',
      type: 'Carte Visa Nationale',
      balance: 210.00,
      status: 'ACTIVE',
      number: '6191548216544215',
      overdraftAuthorized: 500
    }
  });

  const account3 = await prisma.account.upsert({
    where: { rib: '6191789456123789' },
    update: {},
    create: {
      userId: client1.id,
      rib: '6191789456123789',
      iban: 'TN59 6191 7894 5612 3789',
      type: 'Carte MasterCard Travel',
      balance: 850.00,
      status: 'ACTIVE',
      number: '6191789456123789',
      overdraftAuthorized: 1000
    }
  });

  // Create sample transactions
  await prisma.transaction.createMany({
    data: [
      {
        accountId: account1.id,
        type: 'CREDIT',
        amount: 2500.00,
        label: 'Salary Transfer',
        description: 'Monthly salary deposit',
        transactionDate: new Date('2025-06-07')
      },
      {
        accountId: account1.id,
        type: 'DEBIT',
        amount: 100.00,
        label: 'ATM Withdrawal',
        description: 'Cash withdrawal at STB ATM',
        transactionDate: new Date('2025-06-06')
      },
      {
        accountId: account2.id,
        type: 'DEBIT',
        amount: 75.50,
        label: 'Online Purchase',
        description: 'E-commerce transaction',
        transactionDate: new Date('2025-06-05')
      },
      {
        accountId: account3.id,
        type: 'CREDIT',
        amount: 500.00,
        label: 'Transfer In',
        description: 'Transfer from another account',
        transactionDate: new Date('2025-06-04')
      }
    ]
  });

  // Create sample requests
  await prisma.checkbookRequest.createMany({
    data: [
      {
        userId: client1.id,
        phoneNumber: '+21655604103',
        email: 'hichem@example.com',
        rib: '6191235965412365',
        checkbookType: 'standard',
        idType: 'cin',
        idNumber: '12345678',
        status: 'PENDING'
      },
      {
        userId: client2.id,
        phoneNumber: '+21698765432',
        email: 'sarah@example.com',
        rib: '6191548216544215',
        checkbookType: 'premium',
        idType: 'cin',
        idNumber: '87654321',
        status: 'APPROVED'
      }
    ]
  });

  await prisma.creditCardRequest.createMany({
    data: [
      {
        userId: client1.id,
        phoneNumber: '+21655604103',
        cardType: 'visa-classic',
        email: 'hichem@example.com',
        rib: '6191235965412365',
        maxTPE: '2000',
        idType: 'cin',
        idNumber: '12345678',
        status: 'PENDING'
      },
      {
        userId: client3.id,
        phoneNumber: '+21622334455',
        cardType: 'mastercard-gold',
        email: 'mohamed@example.com',
        rib: '6191789456123789',
        maxTPE: '5000',
        idType: 'cin',
        idNumber: '11223344',
        status: 'APPROVED'
      }
    ]
  });

  // Create sample blog posts
  await prisma.blogPost.createMany({
    data: [
      {
        title: 'STB 82.5 MD in net profit in 2024 despite a 5.2% decrease in GNP',
        content: 'The Tunisian Banking Company (STB), a state-owned institution, closed 2024 with a net profit of 82.5 million dinars, despite a decline in profitability and auditor concerns over loan guarantee management...',
        excerpt: 'STB reports strong financial performance despite challenging market conditions.',
        author: 'STB Team',
        category: 'Financial Results',
        published: true
      },
      {
        title: 'STB Bank improves its profit by more than 60% in 2024 to 82 million dinars',
        content: 'STB BANK has just announced significant growth in its financial performance for 2024, with the Board of Directors approving statements showing remarkable profit growth...',
        excerpt: 'STB announces remarkable profit growth for 2024 fiscal year.',
        author: 'Financial Team',
        category: 'Corporate News',
        published: true
      },
      {
        title: 'STB issues a call for applications to appoint two Independent Directors',
        content: 'STB Bank proposes to appoint, through a call for applications, two Independent Directors to sit on its Board of Directors...',
        excerpt: 'STB seeks qualified candidates for Independent Director positions.',
        author: 'Corporate Affairs',
        category: 'Governance',
        published: true
      }
    ]
  });

  // Create sample contact inquiries
  await prisma.contactInquiry.createMany({
    data: [
      {
        name: 'Ahmed Ben Ali',
        email: 'ahmed@example.com',
        phone: '+21698123456',
        subject: 'Unable to access mobile app',
        message: 'I have been trying to log into the mobile app for the past two days but keep getting an error message.',
        category: 'TECHNICAL',
        priority: 'HIGH',
        status: 'PENDING'
      },
      {
        name: 'Fatma Khelifi',
        email: 'fatma@example.com',
        phone: '+21697234567',
        subject: 'Request for account statement',
        message: 'I need my account statements for the last 6 months for tax purposes.',
        category: 'GENERAL',
        priority: 'MEDIUM',
        status: 'IN_PROGRESS',
        assignedTo: testAdmin.id
      }
    ]
  });

  // Create system settings
  await prisma.systemSetting.createMany({
    data: [
      { key: 'maintenance_mode', value: 'false' },
      { key: 'allow_new_registrations', value: 'true' },
      { key: 'require_email_verification', value: 'true' },
      { key: 'max_login_attempts', value: '5' },
      { key: 'session_timeout_minutes', value: '30' }
    ]
  });

  console.log('✅ Database seeded successfully!');
  console.log('👤 Admin user: admin@stb.com.tn / admin123');
  console.log('👤 Test admin: test@admin.com / test123');
  console.log('👤 Client user: hichem@example.com / password123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
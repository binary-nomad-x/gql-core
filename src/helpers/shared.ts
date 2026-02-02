import { prisma } from '../db';

/**
 * **Truncates all PostgreSQL tables** in the `public` schema (except protected ones).
 * 
 * ## ✨ **Key Features**
 * - 🔄 **RESTART IDENTITY** - Resets all auto-increment IDs back to `1`
 * - 🔗 **CASCADE** - Automatically handles foreign key dependencies  
 * - 🛡️ **Prisma-safe** - Excludes `_prisma_migrations` table automatically
 * - ✅ **Type-safe** - Full TypeScript support with proper generics
 *
 * ## 🚀 **Usage Examples**
 * ```ts
 * // Clean ENTIRE database (except Prisma migrations)
 * await truncateTables();
 * 
 * // Protect specific tables
 * await truncateTables(['User', 'Session']);
 * 
 * ```
 *
 * ## ⚠️ **Safety Notes**
 * - **Development/Testing ONLY** - This **DESTROYS ALL DATA**
 * - Automatically protects Prisma's `_prisma_migrations` table
 * - Foreign keys are handled automatically via `CASCADE`
 *
 * @param skipTables - **Optional** array of table names to **PROTECT** from truncation
 * @returns Promise that resolves when complete
 * @throws Logs detailed error if raw query fails
 */
export async function truncateTables(skipTables: string[] = []): Promise<void> {
  try {
    // 1. 🛡️ Internal Prisma protection + user exclusions
    const internalExclusions = ['_prisma_migrations'];
    const allExclusions = [...internalExclusions, ...skipTables];

    // 2. 📋 Fetch all public schema tables
    const tables: { tablename: string }[] = await prisma.$queryRawUnsafe(`
      SELECT tablename 
      FROM pg_catalog.pg_tables 
      WHERE schemaname = 'public'
    `);

    // 3. 🔍 Filter + format table names (handles CamelCase with quotes)
    const tableNames = tables
      .filter((t) => !allExclusions.includes(t.tablename))
      .map((t) => `"${t.tablename}"`)
      .join(', ');

    if (tableNames.length === 0) {
      console.log('ℹ️  No tables to truncate (all excluded/protected)');
      return;
    }

    // 4. 💥 Execute mass TRUNCATE with identity reset
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tableNames} RESTART IDENTITY CASCADE;`);
    
    console.log(`✅ SUCCESS: Cleared ${tables.length - allExclusions.length} tables`);
    console.log(`📋 Tables truncated: ${tableNames}`);

  } catch (error) {
    console.error('❌ TRUNCATE FAILED:', error);
    throw error; // Re-throw for proper error handling
  }
}

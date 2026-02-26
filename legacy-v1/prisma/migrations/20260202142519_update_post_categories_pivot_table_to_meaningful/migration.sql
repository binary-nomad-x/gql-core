-- This is an empty migration.

-- 1. Table ka naam badalna (_CategoryToPost -> post_categories)
ALTER TABLE "_CategoryToPost" RENAME TO "post_categories";

-- 2. Column 'A' ko 'category_id' mein badalna
ALTER TABLE "post_categories" RENAME COLUMN "A" TO "category_id";

-- 3. Column 'B' ko 'post_id' mein badalna
ALTER TABLE "post_categories" RENAME COLUMN "B" TO "post_id";

-- 4. Purane indexes aur constraints ko "Ache" naam dena (Optional but clean)
ALTER TABLE "post_categories" RENAME CONSTRAINT "_CategoryToPost_AB_pkey" TO "post_categories_pkey";
ALTER INDEX "_CategoryToPost_B_index" RENAME TO "post_categories_post_id_idx";

-- 5. Foreign Keys ko rename karna taake professional lagein
ALTER TABLE "post_categories" RENAME CONSTRAINT "_CategoryToPost_A_fkey" TO "post_categories_category_id_fkey";
ALTER TABLE "post_categories" RENAME CONSTRAINT "_CategoryToPost_B_fkey" TO "post_categories_post_id_fkey";



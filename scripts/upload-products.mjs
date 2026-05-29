import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";

const client = createClient({
  projectId: "2kxlijwk",
  dataset: "production",
  token: process.env.SANITY_TOKEN,
  apiVersion: "2021-06-07",
  useCdn: false,
});

const DL = `${process.env.HOME}/Downloads`;
const AMI = `${DL}/Amigurumi Crochet`;
const DOG = `${DL}/Dog Crochet`;
const TURTLE = `${DL}/Turtle Crochet`;
const GS = `${DL}/Granny Square : Hat Crochet`;

const PRODUCTS = [
  {
    title: "Mini Octopus",
    slug: "mini-octopus",
    description:
      "A tiny, squishy crocheted octopus with big safety eyes and a sweet expression. Made with soft chenille yarn, available in multiple colors.",
    category: "amigurumi",
    primary: `${AMI}/IMG_0247.JPG`,
    additional: [
      `${AMI}/IMG_0161.jpg`,
      `${AMI}/IMG_0162.jpg`,
      `${AMI}/IMG_0163.jpg`,
    ],
  },
  {
    title: "Crochet Jellyfish",
    slug: "crochet-jellyfish",
    description:
      "A soft, cuddly crocheted jellyfish with flowing rainbow tentacles and an adorable smiley face. Made with plush chenille yarn.",
    category: "amigurumi",
    primary: `${AMI}/IMG_9794.JPG`,
    additional: [],
  },
  {
    title: "Potted Cactus",
    slug: "potted-cactus",
    description:
      "An adorable crocheted cactus in a smiley-faced pot. Made with ultra-soft chenille yarn, available in a variety of pot colors.",
    category: "amigurumi",
    primary: `${AMI}/IMG_6796.JPG`,
    additional: [`${AMI}/IMG_6797.JPG`, `${AMI}/IMG_6790.jpeg`],
  },
  {
    title: "Mushroom Gnome",
    slug: "mushroom-gnome",
    description:
      "A sweet little crocheted gnome wearing a mushroom cap. Soft and squishy, made with chenille yarn.",
    category: "amigurumi",
    primary: `${AMI}/IMG_3150.jpg`,
    additional: [`${AMI}/IMG_3115.JPG`],
  },
  {
    title: "Crochet Chicken",
    slug: "crochet-chicken",
    description:
      "A charming little crocheted chicken with a bright red comb and beak. Hand-crafted from soft chenille yarn.",
    category: "amigurumi",
    primary: `${AMI}/IMG_3109.jpg`,
    additional: [],
  },
  {
    title: "Crochet Dog",
    slug: "crochet-dog",
    description:
      "A floppy-eared crocheted dog with soulful safety eyes and a lovable personality. Made with soft chenille yarn.",
    category: "amigurumi",
    primary: `${DOG}/IMG_0229.JPG`,
    additional: [
      `${DOG}/IMG_0230.JPG`,
      `${DOG}/IMG_9886.JPG`,
      `${DOG}/IMG_9887.JPG`,
      `${DOG}/IMG_9888.JPG`,
      `${DOG}/IMG_9891.JPG`,
      `${DOG}/IMG_9892.JPG`,
      `${DOG}/IMG_9894.JPG`,
    ],
  },
  {
    title: "Crochet Turtle",
    slug: "crochet-turtle",
    description:
      "A squishy crocheted sea turtle with a textured shell and the cutest little face. Made with ultra-soft chenille yarn, available in multiple colors.",
    category: "amigurumi",
    primary: `${TURTLE}/IMG_8411.JPG`,
    additional: [
      `${TURTLE}/IMG_0550.JPG`,
      `${TURTLE}/IMG_0552.JPG`,
      `${TURTLE}/IMG_0553.JPG`,
      `${TURTLE}/IMG_0554.JPG`,
      `${TURTLE}/IMG_0555.JPG`,
      `${TURTLE}/IMG_4380.JPG`,
      `${TURTLE}/IMG_4381 2.JPG`,
      `${TURTLE}/IMG_4382.JPG`,
      `${TURTLE}/IMG_7502.JPG`,
      `${TURTLE}/IMG_7503.JPG`,
      `${TURTLE}/IMG_8412.JPG`,
      `${TURTLE}/IMG_8414.JPG`,
      `${TURTLE}/IMG_8538.JPG`,
      `${TURTLE}/IMG_8539.JPG`,
      `${TURTLE}/IMG_8540.JPG`,
      `${TURTLE}/IMG_8565.JPG`,
      `${TURTLE}/IMG_8566.jpg`,
      `${TURTLE}/IMG_8567.JPG`,
      `${TURTLE}/IMG_8568.JPG`,
      `${TURTLE}/IMG_9897.JPG`,
    ],
  },
  {
    title: "Lavender Daisy Bucket Hat",
    slug: "lavender-daisy-bucket-hat",
    description:
      "A handmade crocheted bucket hat in soft lavender, adorned with granny square daisy motifs and a delicate scalloped brim.",
    category: "wearables",
    primary: `${GS}/Hat/IMG_0285.JPG`,
    additional: [`${GS}/Hat/IMG_0290.JPG`],
  },
  {
    title: "Granny Square Ornament Covers",
    slug: "granny-square-ornament-covers",
    description:
      "A set of three crocheted ornament covers in classic holiday colors — red, green, and cream. Fits standard glass ball ornaments.",
    category: "accessories",
    primary: `${GS}/Granny Square Ornament/IMG_6820.JPG`,
    additional: [
      `${GS}/Granny Square Ornament/IMG_5995.JPG`,
      `${GS}/Granny Square Ornament/IMG_5996.JPG`,
      `${GS}/Granny Square Ornament/IMG_5997.JPG`,
      `${GS}/Granny Square Ornament/IMG_6817.jpeg`,
      `${GS}/Granny Square Ornament/IMG_6818.JPG`,
      `${GS}/Granny Square Ornament/IMG_6824.JPG`,
    ],
  },
];

async function uploadImage(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`    ⚠ Not found, skipping: ${path.basename(filePath)}`);
    return null;
  }
  const { size } = fs.statSync(filePath);
  if (size === 0) {
    console.warn(`    ⚠ Empty file, skipping: ${path.basename(filePath)}`);
    return null;
  }
  const asset = await client.assets.upload(
    "image",
    fs.createReadStream(filePath),
    { filename: path.basename(filePath) }
  );
  return asset;
}

async function run() {
  if (!process.env.SANITY_TOKEN) {
    console.error("SANITY_TOKEN is not set");
    process.exit(1);
  }

  for (const product of PRODUCTS) {
    console.log(`\n📦 ${product.title}`);

    console.log(`   → primary: ${path.basename(product.primary)}`);
    const primaryAsset = await uploadImage(product.primary);
    if (!primaryAsset) {
      console.error(`   ✗ Primary image failed — skipping product`);
      continue;
    }

    const additionalAssets = [];
    for (const imgPath of product.additional) {
      console.log(`   → ${path.basename(imgPath)}`);
      const asset = await uploadImage(imgPath);
      if (asset) additionalAssets.push(asset);
    }

    const doc = {
      _type: "craft",
      title: product.title,
      slug: { _type: "slug", current: product.slug },
      description: product.description,
      category: product.category,
      inStock: true,
      image: {
        _type: "image",
        asset: { _type: "reference", _ref: primaryAsset._id },
      },
      imageAlt: product.title,
      images: additionalAssets.map((asset) => ({
        _type: "image",
        _key: asset._id,
        asset: { _type: "reference", _ref: asset._id },
        alt: product.title,
      })),
    };

    const created = await client.create(doc);
    console.log(`   ✓ Created ${created._id}`);
  }

  console.log("\n✅ Done!");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

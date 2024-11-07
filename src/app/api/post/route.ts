import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

const posts: { guid: string; text: string; imageUrl: string }[] = [
    {
    guid: "29d5325f-2c28-45b3-b2ed-ef0da2223dc5",
    text: "ちいかわ",
    imageUrl: "/uploads/29d5325f-2c28-45b3-b2ed-ef0da2223dc5-ちいかわ.jpg"
},
{
    guid: "21dda8d1-4730-4cf7-b35e-b36c13aad697",
    text: "函館山（はこだてやま）は、神戸の摩耶山掬星台および長崎の稲佐山とともに「日本三大夜景」。\r\n北海道函館市の市街地西端にあり、展望台のある御殿山をはじめとする13の山々の総称。",
    imageUrl: "/uploads/21dda8d1-4730-4cf7-b35e-b36c13aad697-12.jpg"
},
{
    guid: "68581de5-af27-4b00-afad-a5ca9758821d",
    text: "これは見ておきたい！感動を届ける京都の絶景スポット15選\r\n",
    imageUrl: "/uploads/68581de5-af27-4b00-afad-a5ca9758821d-kyoto.jpg"
},
{
    guid: "eceb0ed3-3a2c-4281-8744-1a14f9ed8912",
    text: "無人島に持ってくならこれ。",
    imageUrl: "/uploads/eceb0ed3-3a2c-4281-8744-1a14f9ed8912-kinniku.jpg"
},
{
    guid: "d8547679-ecfc-4869-a54d-2899462d7263",
    text: "緻密さと芸術性の高さに定評がある　元祖「田んぼアート」",
    imageUrl: "/uploads/d8547679-ecfc-4869-a54d-2899462d7263-739_6_l.jpg"
},
];

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const text = formData.get("text") as string;
  const imageFile = formData.get("image") as File;

  if (!text || !imageFile) {
    return NextResponse.json({ error: "Text and image are required" }, { status: 400 });
  }

  const guid = uuidv4();
  const fileName = `${guid}-${imageFile.name}`;
  const filePath = path.join(process.cwd(), "tmp", fileName);

  // Ensure the uploads directory exists
  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }

  // Save the file to the uploads directory
  const buffer = Buffer.from(await imageFile.arrayBuffer());
  fs.writeFileSync(filePath, buffer);

  const imageUrl = `/tmp/${fileName}`;
  posts.push({ guid, text, imageUrl });

  return NextResponse.json({ guid, imageUrl });
}

export async function GET() {
  return NextResponse.json(posts);
}

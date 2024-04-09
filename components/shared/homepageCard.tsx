import Image from "next/image";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";

interface Props {
  text: string;
  image: string;
  index: string;
}
const HomePageCard = ({ text, image, index }: Props) => {
  return (
    <Card className="w-full md:w-1/2 lg:w-1/3 text-blue-egg-dark p-4  md:mt-6 flex flex-col items-center justify-center border-none homepage_card">
      <CardHeader>
        <p className="text-card-heading text-center -mt-20">{index}</p>
      </CardHeader>
      <CardContent>
        <Image
          src={`/assets/images/${image}`}
          alt={text}
          width={325}
          height={325}
        />
      </CardContent>
      <CardFooter>
        <p className="text-heading3-chat-with-doctor">{text}</p>
      </CardFooter>
    </Card>
  );
};
export default HomePageCard;

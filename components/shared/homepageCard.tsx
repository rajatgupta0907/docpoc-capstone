import Image from "next/image";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";

interface Props {
  text: string;
  image: string;
  index: string;
}
const HomePageCard = ({ text, image, index }: Props) => {
  return (
    <Card className="w-1/4 h-1/4 text-blue-egg-dark p-0 flex flex-col items-center justify-center">
      <CardHeader>
        <p className="text-card-heading text-center -mt-20">{index}</p>
      </CardHeader>
      <CardContent>
        <Image src={`/assets/images/${image}`}  alt={text} width={325} height={325}/>
      </CardContent>
      <CardFooter>
        <p className="text-heading3-chat-with-doctor">{text}</p>
      </CardFooter>
    </Card>
  );
};
export default HomePageCard;

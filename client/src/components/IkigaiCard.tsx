import { motion } from "framer-motion";
import { Heart, Globe, Award, Coins } from "lucide-react";

type IkigaiCardProps = {
  icon: "heart" | "globe" | "award" | "coins";
  title: string;
  description: string;
};

export default function IkigaiCard({
  icon,
  title,
  description,
}: IkigaiCardProps) {
  const renderIcon = () => {
    switch (icon) {
      case "heart":
        return <Heart className="h-10 w-10 text-white mb-3 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />;
      case "globe":
        return <Globe className="h-10 w-10 text-white mb-3 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />;
      case "award":
        return <Award className="h-10 w-10 text-white mb-3 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />;
      case "coins":
        return <Coins className="h-10 w-10 text-white mb-3 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="
                group
                bg-white/10
                backdrop-blur-md
                border border-white/20
                p-6
                rounded-2xl
                text-center
                shadow-lg
                transition-all
                duration-500
                hover:-translate-y-2
                hover:bg-white/15
                hover:border-white/30
                hover:shadow-[0_15px_40px_rgba(255,255,255,0.12)]"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
    >
      {renderIcon()}
      <h3 className="font-semibold text-white text-xl mb-2">{title}</h3>
      <p className="text-white/80">{description}</p>
    </motion.div>
  );
}

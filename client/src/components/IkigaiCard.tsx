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
    const iconClass =
      "h-10 w-10 text-violet-600 mb-3 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3";

    switch (icon) {
      case "heart":
        return <Heart className={iconClass} />;
      case "globe":
        return <Globe className={iconClass} />;
      case "award":
        return <Award className={iconClass} />;
      case "coins":
        return <Coins className={iconClass} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="
        group
        rounded-2xl
        bg-white/75
        backdrop-blur-md
        border border-white/90
        p-6
        text-center
        shadow-[0_10px_30px_rgba(76,29,149,0.10)]
        transition-all
        duration-300
        hover:-translate-y-2
        hover:bg-white/90
        hover:border-violet-200
        hover:shadow-[0_15px_40px_rgba(124,58,237,0.16)]
      "
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
    >
      {renderIcon()}

      <h3 className="font-semibold text-[#35246B] text-xl mb-2">
        {title}
      </h3>

      <p className="text-[#6B6085]">
        {description}
      </p>
    </motion.div>
  );
}
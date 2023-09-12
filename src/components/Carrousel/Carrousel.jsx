import React from "react";
import carrousel from "../../assets/bannner1.png";
import { Carousel } from "react-responsive-carousel";

const Carrousel = () => {
  return (
    <div>
      <img
        src={carrousel}
        alt="carrousel"
        style={{ width: "100%", marginBottom: "20px" }}
      />
    </div>
  );
};

export default Carrousel;

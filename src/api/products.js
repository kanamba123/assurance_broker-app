import axios from "axios";
import config from "../config/config";

export const fetchProductDetails = async (id) => {
  const { data } = await axios.get(
    `${config.API_BASE_URL}/variantesProduits/${id}`
  );
  return data;
};

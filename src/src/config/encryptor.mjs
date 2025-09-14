import { createHmac } from "crypto";
import envs from "./environments.mjs";

class Encrypter {
  static hash(password) {
    return createHmac("sha256", envs.KEYSHA256).update(password).digest("hex");
  }

  static compare(password, hashed) {
    const enteredPasswordHash = Encrypter.hash(password);
    return enteredPasswordHash === hashed;
  }
}

export default Encrypter;

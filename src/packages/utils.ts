import { sign, format } from "js-conflux-sdk";
import { Buffer } from "buffer";

export function labelhash(label: string) {
  const hashBuf = sign.keccak256(Buffer.from(label));
  return format.hex(hashBuf);
}

export function namehash(inputName: string) {
  // Reject empty names:
  const name = inputName.normalize();
  let node = Buffer.alloc(32);

  if (name) {
    const labels = name.split(".");

    for (let i = labels.length - 1; i >= 0; i--) {
      let labelSha = sign.keccak256(Buffer.from(labels[i]));
      node = sign.keccak256(Buffer.concat([node, labelSha], 64));
    }
  }

  return format.hex(node);
}

// @see http://www.tcpipguide.com/free/t_DNSNameNotationandMessageCompressionTechnique.htm#:~:text=Instead,%20DNS%20uses%20a%20special,are%20encoded,%20one%20per%20byte.
// '\x05hello\x03com\x00' => hello.com
export function dnsNameNotationDecode(message: string) {
  const labels = [];
  while (message.length > 0) {
    const length = message.charCodeAt(0);
    if (length === 0 && message.length !== 1) {
      throw new Error("Invalid DNS name notation");
    }
    if (length === 0) {
      break;
    }
    const label = message.slice(1, length + 1);
    labels.push(label);
    message = message.slice(length + 1);
  }
  return labels.join(".");
}

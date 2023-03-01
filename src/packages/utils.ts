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
  const buf = Buffer.from(message, "utf-8");
  const labels = [];
  let start = 0;
  while (start < buf.length) {
    const length = buf[start];
    if (length === 0 && buf.length - start !== 1) {
      throw new Error("Invalid DNS name notation");
    }
    if (length === 0) {
      break;
    }

    const label = buf.subarray(start + 1, start + length + 1).toString("utf-8");
    labels.push(label);
    start = start + length + 1;
  }
  return labels.join(".");
}

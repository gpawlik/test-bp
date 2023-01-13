import "@types/react";
import type {
  MessageDescriptor as MessageDescriptorType,
  MessageDescriptorValues as MessageDescriptorValuesType,
} from "./messages";

declare global {
  type TextType = string | MessageDescriptorType | MessageDescriptorValuesType;
  type MessageDescriptor = MessageDescriptorType;
  type MessageDescriptorValues = MessageDescriptorValuesType;

  declare module "*.png";
}

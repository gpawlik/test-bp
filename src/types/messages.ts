export type MessageDescriptor = {
    id: string;
    defaultMessage: string;
};

export type MessageDescriptorValues = MessageDescriptor & {
    values?: Record<string, string | number>;
};

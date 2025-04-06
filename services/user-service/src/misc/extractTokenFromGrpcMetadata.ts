import { Metadata } from '@grpc/grpc-js';

export const extractTokenFromGrpcMetadata = (
  metadata: Metadata,
): string | null => {
  const authorization = metadata.get('authorization');
  if (Array.isArray(authorization) && authorization.length > 0) {
    const authHeader = authorization[0] as string;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7); // Remove "Bearer " prefix
    }
  }
  return null;
};

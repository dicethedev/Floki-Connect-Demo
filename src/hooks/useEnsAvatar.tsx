import { useEnsAvatar, useEnsName, useAccount } from "wagmi";

interface EnsData {
  ensName?: string;
  ensAvatar?: string | undefined;
}

export function useEnsAvatarData(): EnsData {
  const { address } = useAccount();

  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  return {
    ensName: ensName === null ? undefined : ensName,
    ensAvatar: ensAvatar === null ? undefined : ensAvatar,
  };
}

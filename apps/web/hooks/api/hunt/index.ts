import { trpc } from "~/trpc/client";
export const useCreateHunt = () => {
  const utils = trpc.useUtils()
  const {
    mutateAsync: createHuntAsync,
    mutate: createHunt,
    data,
    error,
    isError,
    isSuccess
  } = trpc.hunt.createHunt.useMutation({
    onSuccess: async () => {
      await Promise.all([
        utils.hunt.getMyHunts.invalidate(),
        utils.hunt.getPublishedHunts.invalidate()])
    }
  });

  return {
    createHuntAsync,
    createHunt,
    data,
    error,
    isError,
    isSuccess
  }
}


export const useUploadImage = () => {
  const {
    mutateAsync: uploadImageAsync,
    data,
    error,
    isError,
    isSuccess,
  } = trpc.hunt.uploadImage.useMutation();

  const uploadImage = async (file: File): Promise<string> => {
    const image = await fileToBase64(file);

    const result = await uploadImageAsync({
      image,
    });

    return result.imageUrl;
  };

  return {
    uploadImage,
    data,
    error,
    isError,
    isSuccess,
  };
};

export const useCreateTextHuntQuestion = () => {
  const utils = trpc.useUtils()
  const {
    mutateAsync: createTextHuntQuestionAsync,
    mutate: createTextHuntQuestion,
    error,
    isError,
    isSuccess

  } = trpc.hunt.createHuntQuestions.useMutation({
    onSuccess: async (_data, variables) => {
      await utils.hunt.getHuntQuestionById.invalidate({ id: variables.huntId });
    },
  })

  return {
    createTextHuntQuestionAsync,
    createTextHuntQuestion,
    error,
    isError,
    isSuccess
  }
}



const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject(new Error("Failed to convert image"));
        return;
      }

      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(new Error("Failed to read image"));
    };

    reader.readAsDataURL(file);
  });
}


export const useGetHuntById = (huntId: string) => {
  const { data, error, isError, isSuccess, isLoading, refetch } = trpc.hunt.getHuntById.useQuery({ id: huntId },
    {
      enabled: !!huntId,
    },
  );

  return {
    data,
    error,
    isError,
    isSuccess,
    isLoading,
    refetch
  };
}

export const useGetHuntQuestionById = (huntId: string) => {
  const { data, error, isError, isSuccess, isLoading, refetch } = trpc.hunt.getHuntQuestionById.useQuery(
    { id: huntId },
    {
      enabled: !!huntId,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  );

  return {
    data,
    error,
    isError,
    isSuccess,
    isLoading,
    refetch
  };
}

export const useDeleteHuntById = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: deleteHuntByIdAsync,
    mutate: deleteHuntById,
    error,
    isError,
    isSuccess,
    isPending,
  } = trpc.hunt.deleteHuntById.useMutation({
    onSuccess: async () => {
      await Promise.all([
        utils.hunt.getPublishedHunts.invalidate(),
        utils.hunt.getMyHunts.invalidate(),
        utils.hunt.getHuntById.invalidate(),
      ]);
    },
  });

  return {
    deleteHuntByIdAsync,
    deleteHuntById,
    error,
    isError,
    isSuccess,
    isPending,
  };
};

export const useDeleteHuntQuestionsById = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: deleteHuntQuestionsByIdAsync,
    mutate: deleteHuntQuestionsById,
    error,
    isError,
    isSuccess,
    isPending
  } = trpc.hunt.deleteHuntQuestionsById.useMutation({
    onSuccess: async (_data, variables) => {
      await utils.hunt.getHuntQuestionById.invalidate({ id: variables.huntId });
    },
  })

  return {
    deleteHuntQuestionsByIdAsync,
    deleteHuntQuestionsById,
    error,
    isError,
    isSuccess,
    isPending
  }
}

export const useUpdateHuntQuestionByIdAndIndex = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: updateHuntQuestionByIdAndIndexAsync,
    mutate: updateHuntQuestionByIdAndIndex,
    error,
    isError,
    isSuccess,
    isPending
  } = trpc.hunt.updateHuntQuestionByIdAndIndex.useMutation({
    onSuccess: async (_data, variables) => {
      await utils.hunt.getHuntQuestionById.invalidate({ id: variables.huntId });
    },
  })

  return {
    updateHuntQuestionByIdAndIndexAsync,
    updateHuntQuestionByIdAndIndex,
    error,
    isError,
    isSuccess,
    isPending
  }
}

export const useGetPublishedHunts = () => {
  const { data, error, isError, isSuccess, isLoading, refetch } =
    trpc.hunt.getPublishedHunts.useQuery();

  return {
    data,
    error,
    isError,
    isSuccess,
    isLoading,
    refetch,
  };
};

export const useGetMyHunts = () => {
  const { data, error, isError, isSuccess, isLoading, refetch } =
    trpc.hunt.getMyHunts.useQuery();

  return {
    data,
    error,
    isError,
    isSuccess,
    isLoading,
    refetch,
  };
};

export const useUpdateHuntStatus = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: updateHuntStatusAsync,
    mutate: updateHuntStatus,
    error,
    isError,
    isSuccess,
    isPending,
  } = trpc.hunt.updateHuntStatus.useMutation({
    onSuccess: async () => {
      await Promise.all([
        utils.hunt.getPublishedHunts.invalidate(),
        utils.hunt.getMyHunts.invalidate(),
        utils.hunt.getHuntById.invalidate(),
      ]);
    },
  });

  return {
    updateHuntStatusAsync,
    updateHuntStatus,
    error,
    isError,
    isSuccess,
    isPending,
  };
};

export const useUpdateHuntTag = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: updateHuntTagAsync,
    mutate: updateHuntTag,
    error,
    isError,
    isSuccess,
    isPending,
  } = trpc.hunt.updateHuntTag.useMutation({
    onSuccess: async () => {
      await Promise.all([
        utils.hunt.getPublishedHunts.invalidate(),
        utils.hunt.getMyHunts.invalidate(),
        utils.hunt.getHuntById.invalidate(),
      ]);
    },
  });

  return {
    updateHuntTagAsync,
    updateHuntTag,
    error,
    isError,
    isSuccess,
    isPending,
  };
};

export const useRecordHuntPlay = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: recordHuntPlayAsync,
    mutate: recordHuntPlay,
    error,
    isError,
    isSuccess,
    isPending,
  } = trpc.hunt.recordHuntPlay.useMutation({
    onSuccess: async () => {
      await Promise.all([
        utils.hunt.getPublishedHunts.invalidate(),
        utils.hunt.getMyHunts.invalidate(),
      ]);
    },
  });

  return {
    recordHuntPlayAsync,
    recordHuntPlay,
    error,
    isError,
    isSuccess,
    isPending,
  };
};

export const useVerifyAnswer = () => {
  const {
    mutateAsync: verifyAnswerAsync,
    mutate: verifyAnswer,
    error,
    isError,
    isSuccess,
    isPending,
  } = trpc.hunt.verifyAnswer.useMutation();

  return {
    verifyAnswerAsync,
    verifyAnswer,
    error,
    isError,
    isSuccess,
    isPending,
  };
};

export const useRecordHuntCompletion = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: recordHuntCompletionAsync,
    mutate: recordHuntCompletion,
    error,
    isError,
    isSuccess,
    isPending,
  } = trpc.hunt.recordHuntCompletion.useMutation({
    onSuccess: async () => {
      await utils.hunt.getLeaderboard.invalidate();
    },
  });

  return {
    recordHuntCompletionAsync,
    recordHuntCompletion,
    error,
    isError,
    isSuccess,
    isPending,
  };
};

export const useGetLeaderboard = () => {
  const { data, error, isError, isSuccess, isLoading, refetch } =
    trpc.hunt.getLeaderboard.useQuery(undefined, {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
    });

  return {
    data,
    error,
    isError,
    isSuccess,
    isLoading,
    refetch,
  };
};
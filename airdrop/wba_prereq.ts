export type WbaPrereq = {
  version: "0.1.0";
  name: "wba_prereq";
  instructions: [
    {
      name: "complete";
      accounts: [
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
      ];
      args: [
        {
          name: "github";
          type: "bytes";
        },
      ];
    },
  ];
};

export const IDL: WbaPrereq = {
  version: "0.1.0",
  name: "wba_prereq",
  instructions: [
    {
      name: "complete",
      accounts: [
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "github",
          type: "bytes",
        },
      ],
    },
  ],
};

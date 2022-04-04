// 代数的データ型

type TypedUnion<T extends Record<PropertyKey, object>> = {
  [k in keyof T]: T[k] & { type: k };
}[keyof T];

type UserUnion = TypedUnion<{
  /**
   * アカウント作成済み
   */
  Member: { id: number; name: string; mail: string };
  /**
   * 仮登録
   */
  Guest: { name: string };

  // /**
  //  * 増える予定
  //  */
  // GoldMember: { id: number; name: string; mail: string };
}>;

/**
 * 
 * 使用例
 ```ts
 const alice: UserStruct<"Member"> = {
    type: "Member",
    id: 1,
    name: "alice",
    mail: "alice@gmail.com",
   };
 ```
 */
type UserStruct<Tag extends UserUnion["type"]> = Extract<
  UserUnion,
  Record<"type", Tag>
>;

const match = <Result>(
  value: UserUnion,
  patterns: {
    [K in UserUnion["type"]]: (param: Omit<UserStruct<K>, "type">) => Result;
  }
) => {
  // TODO any
  return patterns[value.type](value as any);
};

const f = (user: UserUnion) =>
  match(user, {
    Member: (member) => member.mail,
    Guest: (guest) => guest.name,
  });

// ---
// 簡易版

const exhaustiveCheck = (_: never): never => {
  throw new Error("Exhaustive check failed.");
};

const showMessageIf = (user: UserUnion): string => {
  if (user.type === "Member") {
    return `こんにちは ${user.name} さん。あなたのメールアドレス: ${user.mail}`;
  }

  if (user.type === "Guest") {
    return `こんにちは ${user.name} さん。会員登録はいかがですか？`;
  }
  return exhaustiveCheck(user);
};

const showMessageSwitch = (user: UserUnion): string => {
  switch (user.type) {
    case "Member": {
      return `こんにちは ${user.name} さん。あなたのメールアドレス: ${user.mail}`;
    }
    case "Guest": {
      return `こんにちは ${user.name} さん。会員登録はいかがですか？`;
    }
  }
  return exhaustiveCheck(user);
};

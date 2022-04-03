/**
 * `T`のユニオンを作る
 * 判別用に`type`を付与
 */
type CreateUsers<T extends Record<PropertyKey, object>> = {
  [k in keyof T]: T[k] & { type: k };
}[keyof T];

type User = CreateUsers<{
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
 * 
 ```ts
 const alice: UserStruct<"Member"> = {
    type: "Member",
    id: 1,
    name: "alice",
    mail: "alice@gmail.com",
   };
 ```
 */
type UserStruct<Tag extends User["type"]> = Extract<User, Record<"type", Tag>>;

// ---

const match = <Result>(
  value: User,
  patterns: {
    [K in User["type"]]: (param: Omit<UserStruct<K>, "type">) => Result;
  }
) => {
  // TODO any
  return patterns[value.type](value as any);
};

const f = (user: User) => {
  const r = match(user, {
    Member: (member) => member.mail,
    Guest: (guest) => guest.name,
  });
};

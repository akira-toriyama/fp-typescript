// 代数的データ型

type User1 = {
  id: number;
  name: string;
  mail: string;
};

const member: User1 = {
  id: 1,
  name: "Alice",
  mail: "alice@mail.com",
};

// つらみ -> 使わないプロパティに対してダミーの値を与える必要があります。
const guest: User1 = {
  id: -1, // ゲストユーザーにはIDが付与されない
  name: "Bob",
  mail: "", // ゲストユーザーはメールアドレス登録を行っていない
};
// ----------------------------------------------------------------------

class Member {
  constructor(public id: number, public name: string, public mail: string) {}
}

class Guest {
  constructor(public name: string) {}
}

class LegacyMember {
  constructor() {}
}

// 上記のつらみを Unionでかいけつ
type User2 = Member | Guest;

// type User3 = Member | Guest | LegacyMember;

const exhaustiveCheck = (_: never) => {
  throw new Error("Exhaustive check failed.");
};

const showMessage = (user: User2): string => {
  if (user instanceof Guest) {
    return `こんにちは ${user.name} さん。会員登録はいかがですか？`;
  }

  if (user instanceof Member) {
    return `こんにちは ${user.name} さん。あなたのメールアドレス: ${user.mail} `;
  }

  // 考慮すべき型が網羅されているか
  // もし、LegacyMemberが追加されてもtype errorになる
  const _: never = user;
  return "";

  // util関数を作ると良い
  // return exhaustiveCheck(user);
};

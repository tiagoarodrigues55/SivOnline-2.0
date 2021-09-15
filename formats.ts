interface Investidor{
  id: number,
  username: string,
  email: string,
  password: string,
  representation_type: string,
  representation: string,
  vivacoins: number,
  positions: Position[],
  points: number,
  created_at: string,
  updated_at: string
}
interface Position{
  id: number,
  quantity: number
}
interface Delegado{
  id: number,
  username: string,
  email: string,
  password: string,
  representation_type: string,
  representation: string,
  price: number,
  lastValorization: number,
  hystoryPrice: number,
  points: number,
  stock: number
  created_at: string,
  updated_at: string
}
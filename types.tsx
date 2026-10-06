export type Format = 'vinyl' | 'cd' | 'cassette'
export type Condition = 'Mint' | 'Near Mint' | 'Very Good' | 'Good' | 'Fair' | 'Poor'
export const CONDITIONS: Condition[] = ['Mint', 'Near Mint', 'Very Good', 'Good', 'Fair', 'Poor']
export type Priority = 'low' | 'medium' | 'high'

export interface AlbumFormData {
  title: string; artist: string; year: string; genre: string; format: Format; condition: Condition; rating: number; purchasePrice: string; purchaseDate: string; notes: string
}

export interface Album {
  id: string
  title: string
  artist: string
  year: number
  genre: string
  format: Format
  condition: Condition
  rating: number
  purchasePrice: number
  purchaseDate: string
  notes: string
  tracks: string[]
  color: string // accent color for placeholder art
  addedDate: string
}

export interface WishlistItem {
  id: string
  title: string
  artist: string
  year: number
  genre: string
  format: Format
  priority: Priority
  targetPrice: number
  color: string
}

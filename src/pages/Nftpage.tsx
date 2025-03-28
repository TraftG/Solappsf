import React from "react";
import axios from "axios";
import { useIsFetching } from "@tanstack/react-query";
import { set } from "mongoose";


interface NftPageProps {
    id: string;
    name: string;
    description: string;
    image: string;
}

interface CollectionResponse {
    data: NftPageProps[];
}

const NFTsbyCollection = () => {
    const [nfts, setNfts] = React.useState<NftPageProps[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    const collectionID = 'cb792d4d617abed1517b97462ee9b82a'

    
  useEffect(() => {
    // Вставьте свой API ключ
    const apiKey = '<ВАШ_API_КЛЮЧ>';

    const fetchNftsByCollection = async () => {
      try {
        const response = await axios.get<CollectionResponse>('https://solanaapi.nftscan.com/api/sol/assets/collection/Okay' , {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
          },
        });
                setNfts(response.data.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch NFTs');
                setLoading(false);
            }
        };

        fetchNftsByCollection();
    }, [collectionID]);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>NFT Collection</h1>
            <div className="nfts-list">
                {nfts.map((nft) => (
                    <div key={nft.id} className="nft-item">
                        <img src={nft.image_url} alt={nft.name} />
                        <h2>{nft.name}</h2>
                        <p>{nft.description}</p>
                    </div>
                ))}
            </div>

        </div>
    );

}
export default NFTsbyCollection;
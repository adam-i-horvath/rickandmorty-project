import React from "react";

import "./main.pages.css";

import { useQuery, gql } from "@apollo/client";

interface CharacterIF {
  characters: {
    results: {
      map: any;
    };
  };
}

const GET_DATA = gql`
  query {
    characters {
      results {
        id
        name
        species
        status
        image
      }
    }
  }
`;

const Main = () => {
  const { error, data, loading } = useQuery<CharacterIF>(GET_DATA);

  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;
  console.log({ data });
  return (
    <>
      <div className="characters__title">Rick and Morty characters</div>

      <div className="characters__container">
        {data?.characters.results.map(
          (character: {
            name: string;
            image: string;
            species: string;
            status: string;
          }) => {
            return (
              <div className="character">
                <h1 className="character__name">{character.name}</h1>
                <img
                  className="character__image"
                  src={character.image}
                  alt="lol"
                />
                <span className="character__species">{character.species}</span>
                <span className="character__status">{character.status}</span>
              </div>
            );
          }
        )}
      </div>
    </>
  );
};

export default Main;

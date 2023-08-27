import { useState } from 'react';
import './App.css';
import {  PetProfile, Pets } from "./ui-components";
import {  NavBarHeader } from "./ui-components";
import {  MarketingFooter } from "./ui-components";
import {  AddPet } from "./ui-components";
import {  PetDetails } from './ui-components';
import { withAuthenticator } from '@aws-amplify/ui-react';

function App({user, signOut}) {
  const detailsOverride = {
    Close: {
      style: {
        cursor: "pointer"
      },
      onClick: () => {
        setShowDetails(false);
      },
    }
  }
  const [showForm, setShowForm] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [pet, setPet] = useState()
  const [updatePet, setUpdatePet] = useState()

  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [breed, setBreed] = useState("")
  const [about, setAbout] = useState("")
  const [color, setColor] = useState("")
  const [image, setImage] = useState("")

  const formOverride = {
    TextField29766922: {
      placeholder: name
    },
    TextField29766923: {
      placeholder: age
    },
    TextField29766924: {
      placeholder: breed
    },
    TextField38543634: {
      placeholder: about
    },
    TextField38543641: {
      placeholder: color
    },
    TextField38543648: {
      placeholder: image
    },
    image: {
      src: updatePet == null ? "https://images.unsplash.com/photo-1655648340915-019ee5a3fb2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGV0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
      : updatePet.image,
    },

    Button29766926: {
      isDisabled: updatePet ? true : false
    },

    Button38543680: {
      isDisabled: !updatePet ? true : false
    },

    MyIcon: {
      style: {
        cursor: "pointer"
      },
      onClick: () => {
        setShowForm(false);
      },
    }
  }
  const navBarHeaderOverride = {
    image: {
      src: user?.attributes?.profile,
      //src: "https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJvYm90fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    AddPet: {
      style: {
        cursor: "pointer"
      },
      onClick: () => {
        setShowForm(!showForm);
      },
    },
    Button: {
      onClick: signOut
    }
  };
  return (
    <div className='App'>
      <NavBarHeader width={"100%"}
      overrides={navBarHeaderOverride} />
      <header className='App-header'>
        {
          showForm && (
            <AddPet
              pet={updatePet}
              style={{
                textAlign: "left"
              }}
              overrides={formOverride}
            />
          )
        }
        { showDetails && (
            <PetDetails
              overrides={detailsOverride}
              pet={pet}
              style={{
                textAlign: "left",
                margin: "1rem"
              }}
            />
          )
        }
        <Pets
          overrideItems={({item, index}) => ({
            overrides: {
              Breed: {color: "blue"},
              Button3848486: {
                onClick: () => {
                  setShowDetails(!showDetails)
                  setPet(item)
                }
              },
              Button3848426: {
                onClick: () => {
                  setUpdatePet(item)
                  setName(item.name)
                  setAge(item.age)
                  setAbout(item.about)
                  setBreed(item.breed)
                  setColor(item.color)
                  setImage(item.image)
                  if (!showForm) setShowForm(true)
                }
              }
            },
          })}
        />
      </header>
      <MarketingFooter width={"100%"} />
    </div>
  );
}

export default withAuthenticator(App);

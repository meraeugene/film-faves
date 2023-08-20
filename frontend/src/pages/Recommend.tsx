import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  Textarea,
  useToast,
  Button,
} from "@chakra-ui/react";
import InputField from "../components/InputField";
import { useFilmsContext } from "../hooks/useFilmsContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";

const Recommend = () => {
  const [image, setImage] = useState<File | null>(null);
  const [genre, setGenre] = useState("");
  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const toast = useToast();
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [imgFilename, setImgFilename] = useState("");

  const { user } = useAuthContext();

  const { dispatch } = useFilmsContext();

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const submitImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("release_date", releaseDate);
    formData.append("genre", genre);
    formData.append("description", description);
    formData.append("link", link);

    if (user && user.username) {
      formData.append("username", user.username); // Attach username here
    }

    if (!genre || !title || !releaseDate || !description || !link) {
      toast({
        title: "Film not uploaded.",
        description: "Please fill in all fields ",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }

    if (image) {
      formData.append("image", image);
    } else {
      toast({
        title: "Film not uploaded.",
        description: "Please upload an image for the poster.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }

    if (!isValidHttpUrl(link)) {
      toast({
        title: "Film not uploaded.",
        description: "Please enter a valid URL for the stream link.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/films/recommend`,
        // "http://localhost:4000/api/films/recommend",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user?.token}`,
          },
        },
      );

      if (response.status === 200) {
        const recommendedFilm = response.data.data;

        console.log(response.data);

        toast({
          title: "Film created.",
          description: "Film recommendation submitted successfully!",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
        resetForm(); // Reset the form fields

        dispatch({ type: "CREATE_FILMS", payload: recommendedFilm });

        // // Redirect the user to /films route
        navigate("/films");
      } else {
        console.log(response.data.error);
      }
    } catch (error) {
      toast({
        title: "Film not uploaded.",
        description: "An error has been encountered with the server.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];

    if (selectedFile) {
      setImage(selectedFile);
      setImgFilename(selectedFile.name);
    }
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGenre(e.target.value);
  };

  const onBlur = (
    event: React.FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleDescriptionLimit = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(e.target.value);
  };

  const resetForm = () => {
    setGenre("");
    setImage(null);
    setTitle("");
    setReleaseDate("");
    setDescription("");
    setLink("");
    setTouched({});
    setLoading(false);
    setImgFilename("");
  };

  const isValidHttpUrl = (str: string) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$", // fragment locator
      "i",
    );
    return pattern.test(str);
  };

  return (
    <div className="recommend mb-12 h-full bg-dark px-6 pt-16 uppercase text-white">
      <h1 className="text-center font-researcher text-3xl md:text-4xl lg:text-5xl">
        Recommend
      </h1>
      <h1 className="mb-8 text-center font-researcher text-3xl  md:text-4xl lg:text-5xl">
        A Film
      </h1>
      <form onSubmit={submitImage}>
        <div className="form-body">
          <FormControl
            isInvalid={touched.genre && !genre}
            className="input-box"
            isRequired
          >
            <FormLabel>Genre:</FormLabel>
            <Select
              name="genre"
              variant="outline"
              id="genre"
              value={genre}
              onChange={handleGenreChange}
              onBlur={onBlur}
              className="cursor-pointer"
            >
              <option value="" hidden>
                Select a category
              </option>
              <option value="action-adventure">Action-Adventure</option>
              <option value="animation">Animation</option>
              <option value="comedy">Comedy</option>
              <option value="documentaries">Documentaries</option>
              <option value="filipino">Filipino</option>
              <option value="horror">Horror</option>
              <option value="k-drama">K-Drama</option>
              <option value="romantic">Romantic</option>
              <option value="sci-fi">Sci-Fi</option>
              <option value="southeast-asian">Southeast Asian</option>
              <option value="thriller">Thriller</option>
            </Select>
            <FormErrorMessage className="font-outfit tracking-wider">
              Genre is required.
            </FormErrorMessage>
          </FormControl>

          <InputField
            title="Title"
            type="text"
            isInvalid={touched.title && !title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={onBlur}
            value={title}
            name="title"
            error="Title is required."
          />

          <InputField
            title="Year"
            type="number"
            isInvalid={touched.release_date && !releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            onBlur={onBlur}
            value={releaseDate}
            name="release_date"
            error="Year is required."
          />

          <FormControl
            isInvalid={touched.description && !description}
            isRequired
          >
            <FormLabel className="font-aquire">Review:</FormLabel>
            <Textarea
              rows={3}
              cols={0}
              onChange={handleDescriptionLimit}
              value={description}
              name="description"
              onBlur={onBlur}
            />

            <FormErrorMessage className="font-outfit tracking-wider">
              Description is required.
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={touched.link && !link}
            isRequired
            className="my-14"
          >
            <FormLabel className="font-aquire">Where to Watch:</FormLabel>
            <Textarea
              rows={2}
              cols={0}
              onChange={(e) => setLink(e.target.value)}
              value={link}
              name="link"
              onBlur={onBlur}
            />
            <FormErrorMessage className=" font-outfit tracking-wider">
              Stream Link is required.
            </FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={touched.image && !image}>
            <FormLabel className="font-aquire tracking-widest ">
              Poster:
            </FormLabel>
            <label className="img-label" htmlFor="file">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              Choose a Image
            </label>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={onInputChange}
              className="mt-3 w-full  rounded bg-lightDark "
              onBlur={onBlur}
              id="file"
            />
            {imgFilename && (
              <div className="mt-2 font-outfit normal-case">
                File:{" "}
                {imgFilename.length > 20
                  ? imgFilename.substring(0, 25) + "..."
                  : imgFilename}
              </div>
            )}
            <FormErrorMessage className="tr font-outfit tracking-wider">
              Poster is required.
            </FormErrorMessage>
          </FormControl>

          <Button
            isLoading={loading}
            loadingText="Uploading..."
            spinnerPlacement="start"
            type="submit"
            colorScheme="isLoading"
            variant="outline"
            className="mt-4 w-full"
          >
            Recommend
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Recommend;

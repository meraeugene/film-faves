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
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [genre, setGenre] = useState("");
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

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to recommend a film.",
        status: "error",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("category", category);
    formData.append("title", title);
    formData.append("release_date", releaseDate);
    formData.append("genre", genre);
    formData.append("description", description);
    formData.append("link", link);

    if (
      !category ||
      !title ||
      !releaseDate ||
      !genre ||
      !description ||
      !link
    ) {
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
      formData.append("testImage", image);
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
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      if (response.status === 201) {
        const recommendedFilm = response.data;

        console.log("Recommended Film:", recommendedFilm);

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

        // Redirect the user to /films route
        navigate("/films?page=1");
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

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
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
    setImage(null);
    setCategory("");
    setTitle("");
    setReleaseDate("");
    setGenre("");
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
    <div className="recommend h-full bg-dark px-6 pb-12 pt-16 uppercase text-white">
      <h1 className="text-center font-researcher text-3xl md:text-4xl lg:text-5xl">
        Recommend
      </h1>
      <h1 className="mb-8 text-center font-researcher text-3xl  md:text-4xl lg:text-5xl">
        A Film
      </h1>
      <form onSubmit={submitImage}>
        <div className="form-body">
          <FormControl
            isInvalid={touched.category && !category}
            className="input-box"
            isRequired
          >
            <FormLabel>Category:</FormLabel>
            <Select
              name="category"
              variant="outline"
              id="recommend-category"
              value={category}
              onChange={handleCategoryChange}
              onBlur={onBlur}
              className="cursor-pointer"
            >
              <option value="" hidden>
                Select a category
              </option>
              <option value="live-action">Live-Action</option>
              <option value="animation">Animation</option>
            </Select>
            <FormErrorMessage className="font-outfit tracking-wider">
              Category is required.
            </FormErrorMessage>
          </FormControl>

          <InputField
            title="Title"
            type="text"
            placeholder="(e.g. Insidious: The Red Door)"
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
            placeholder="(e.g. 2023)"
            isInvalid={touched.release_date && !releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            onBlur={onBlur}
            value={releaseDate}
            name="release_date"
            error="Year is required."
          />

          <InputField
            title="Genre"
            type="text"
            placeholder="(e.g. Horror)"
            isInvalid={touched.genre && !genre}
            onChange={(e) => setGenre(e.target.value)}
            onBlur={onBlur}
            value={genre}
            name="genre"
            error="Genre is required."
          />

          <FormControl
            isInvalid={touched.description && !description}
            isRequired
          >
            <FormLabel className="font-aquire">Description:</FormLabel>
            <Textarea
              rows={3}
              cols={0}
              placeholder="(e.g. Lambert's school drop-off turns chilling as demons resurface.)"
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
              placeholder="(e.g. https://sflix.to/movie/free-insidious-the-red-door-hd-98131)"
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
              name="testImage"
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

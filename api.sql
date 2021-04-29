--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2 (Ubuntu 13.2-1.pgdg20.04+1)
-- Dumped by pg_dump version 13.2 (Ubuntu 13.2-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bands; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.bands (
    band_id integer NOT NULL,
    name character varying(20) NOT NULL,
    description character varying(200) NOT NULL,
    image_url character varying(500) NOT NULL
);


ALTER TABLE public.bands OWNER TO me;

--
-- Name: bands_band_id_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.bands_band_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bands_band_id_seq OWNER TO me;

--
-- Name: bands_band_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.bands_band_id_seq OWNED BY public.bands.band_id;


--
-- Name: musician_band; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.musician_band (
    id integer NOT NULL,
    musician_id integer NOT NULL,
    band_id integer NOT NULL
);


ALTER TABLE public.musician_band OWNER TO me;

--
-- Name: musician_band_id_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.musician_band_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.musician_band_id_seq OWNER TO me;

--
-- Name: musician_band_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.musician_band_id_seq OWNED BY public.musician_band.id;


--
-- Name: musicians; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.musicians (
    musician_id integer NOT NULL,
    name character varying(50) NOT NULL,
    age integer NOT NULL,
    date_of_birth date NOT NULL,
    instrument character varying(50) NOT NULL,
    image_url character varying(500) NOT NULL
);


ALTER TABLE public.musicians OWNER TO me;

--
-- Name: musicians_musician_id_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.musicians_musician_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.musicians_musician_id_seq OWNER TO me;

--
-- Name: musicians_musician_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.musicians_musician_id_seq OWNED BY public.musicians.musician_id;


--
-- Name: bands band_id; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.bands ALTER COLUMN band_id SET DEFAULT nextval('public.bands_band_id_seq'::regclass);


--
-- Name: musician_band id; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.musician_band ALTER COLUMN id SET DEFAULT nextval('public.musician_band_id_seq'::regclass);


--
-- Name: musicians musician_id; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.musicians ALTER COLUMN musician_id SET DEFAULT nextval('public.musicians_musician_id_seq'::regclass);


--
-- Data for Name: bands; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.bands (band_id, name, description, image_url) FROM stdin;
1	beatles	sdvsdvsd sdvksdvmsd sdvmlskdv	https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg
2	doors	sdvsdvsd sdvksdvmsd sdvmlskdv	https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg
3	Queen	some lame description	https://wallpapercave.com/wp/wp4180941.jpg
4	doors	sdvsdvsd sdvksdvmsd sdvmlskdv	https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg
5	d	sdvsdvsd sdvksdvmsd sdvmlskdv	https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg
6	adscaaaa	aa	https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg
7	sdv	dsv	https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg
8	dscsd	sdvsdvsd sdvksdvmsd sdvmlskdv	https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg
9	d	sdv	https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg
10	Black Eyed Peas	some lame description	https://www.rollingstone.com/wp-content/uploads/2018/11/black-eyed-peas-album-review.jpg
12	d	sdvsdvsd sdvksdvmsd sdvmlskdv	https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg
\.


--
-- Data for Name: musician_band; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.musician_band (id, musician_id, band_id) FROM stdin;
3	2	2
4	2	1
5	3	2
6	3	2
7	11	2
8	12	2
9	4	2
10	12	3
11	9	1
12	2	6
13	5	2
14	3	5
\.


--
-- Data for Name: musicians; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.musicians (musician_id, name, age, date_of_birth, instrument, image_url) FROM stdin;
2	cds	21	2000-04-19	svd	https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg
3	John Lennon	21	2000-04-19	Guitar	https://cdn.britannica.com/01/136501-050-D9110414/John-Lennon.jpg
4	Paul Rudd	21	2000-04-19	Guitar	https://media1.popsugar-assets.com/files/thumbor/nTzUcJ32kqHBb_P64QJMsbCqwA8/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2020/11/13/727/n/45101125/tmp_k3hsWA_6a805bd64f61267d_GettyImages-1203470663.jpg
5	Paul Rudd	21	2000-04-19	Guitar	https://media1.popsugar-assets.com/files/thumbor/nTzUcJ32kqHBb_P64QJMsbCqwA8/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2020/11/13/727/n/45101125/tmp_k3hsWA_6a805bd64f61267d_GettyImages-1203470663.jpg
6	d	0	2021-04-15	sdvsdv	https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg
7	d	0	2021-04-16	sdvsdv	https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg
8	sdv	0	2021-04-16	sdvsdv	https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg
9	sdv	0	2021-04-17	sdvsdv	https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg
10	dcdsv	0	2021-04-15	sdv	https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg
11	cdcdsv	0	2021-04-16	sdvds	https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg
12	vfd	0	2021-04-14	dfv	https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg
13	dsvs	0	2021-04-08	sdv	https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg
14	d	0	2021-04-04	v	https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg
\.


--
-- Name: bands_band_id_seq; Type: SEQUENCE SET; Schema: public; Owner: me
--

SELECT pg_catalog.setval('public.bands_band_id_seq', 12, true);


--
-- Name: musician_band_id_seq; Type: SEQUENCE SET; Schema: public; Owner: me
--

SELECT pg_catalog.setval('public.musician_band_id_seq', 14, true);


--
-- Name: musicians_musician_id_seq; Type: SEQUENCE SET; Schema: public; Owner: me
--

SELECT pg_catalog.setval('public.musicians_musician_id_seq', 14, true);


--
-- Name: bands bands_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.bands
    ADD CONSTRAINT bands_pkey PRIMARY KEY (band_id);


--
-- Name: musician_band musician_band_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.musician_band
    ADD CONSTRAINT musician_band_pkey PRIMARY KEY (id);


--
-- Name: musicians musicians_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.musicians
    ADD CONSTRAINT musicians_pkey PRIMARY KEY (musician_id);


--
-- PostgreSQL database dump complete
--


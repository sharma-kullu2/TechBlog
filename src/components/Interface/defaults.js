import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';

const Title = "An awesome blog post title !!";
const Description = "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.";
const Image = "https://imgbox.com/oEbE9dkq";
const ImageText = "An inspiring picture";
const LinkText = "continue reading";
const Author = "A.I";
const Label = "main";
const Date = "08-10-2024";
const Tags = "Not tagged";
const Data = {
    "time": 1728384512132,
    "blocks": [
        {
            "id": "JoLRomV5xL",
            "type": "paragraph",
            "data": {
                "text": "Post content"
            }
        }
    ],
    "version": "2.30.5"
};


export class Post {
    constructor({title = Title, summary = Description, date = Date,image=Image,imageText=ImageText, linkText=LinkText, author=Author,label=Label,data=Data, category=sections[0].title,tags=Tags, comments=[]} = {}) {
        this.title = title;
        this.date = date;
        this.description = summary;
        this.image = image;
        this.imageText = imageText;
        this.linkText = linkText;
        this.author = author;
        this.label = label;
        this.data = data;
        this.category = category;
        this.tags = tags;
        this.comments = comments;
    }
};

export const sections = [
    { title: 'Programming', url: '#' },
    { title: 'AI/ML', url: '#' },
    { title: 'Operating Systems', url: '#' },
    { title: 'Tech Recipes', url: '#' },
    { title: 'Finance', url: '#' },
    { title: 'Embedded Systems', url: '#' },
    { title: 'LifeStyle', url: '#' },
    { title: 'Travel Diary', url: '#' },
  ];

export const title = 'TechLife Digest';

export const sidebar = {
    title: 'Welcome to the journey',
    description:
      'This is more than just a blog—it’s a hub for hobbyists, engineers, and technology evangelists. Here, I share my journey, insights, and expertise to help you navigate the ever-evolving world of technology.',
    title_2:'About the Author',
    description_2:'Hi, I’m Gaurav, a tech enthusiast with a knack for simplifying complex concepts. Whether it’s crafting clean architecture, unraveling the mysteries of React, or exploring the depths of Python, I’m always eager to learn and share what I discover',
    archives: [
      { title: 'October 2024', url: '#' },
      { title: 'November 2024', url: '#' },
    ],
    social: [
      { name: 'GitHub', icon: GitHubIcon },
      { name: 'X', icon: XIcon },
      { name: 'Facebook', icon: FacebookIcon },
    ],
  };
  


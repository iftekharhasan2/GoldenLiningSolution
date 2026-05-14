import ProofOfWork from '@/ui/components/scroll/ProofOfWork';

const works = [
  { image: '/gori.png', imageAlt: 'Gori the Gorilla', title: 'Gori', subtitle: 'Jungle Sage' },
  { image: '/crocs2.png', imageAlt: 'Snap the Croc', title: 'Snap', subtitle: 'Swamp King' },
  { image: '/crow.png', imageAlt: 'Crowley the Crow', title: 'Crowley', subtitle: 'Night Watcher' },
  { image: '/foxy.png', imageAlt: 'Foxy the Fox', title: 'Foxy', subtitle: 'Forest Trickster' },
  { image: '/snake.png', imageAlt: 'Slither the Snake', title: 'Slither', subtitle: 'Desert Whisper' },
  { image: '/bear.png', imageAlt: 'Bruno the Bear', title: 'Bruno', subtitle: 'Mountain Guardian' },
  { image: '/owl.png', imageAlt: 'Hoot the Owl', title: 'Hoot', subtitle: 'Wise Watcher' },
  { image: '/crocs.png', imageAlt: 'Chompy the Croc', title: 'Chompy', subtitle: 'River Sentinel' },
  { image: '/tiger.png', imageAlt: 'Rajah the Tiger', title: 'Rajah', subtitle: 'Jungle Emperor' },
  { image: '/bulldog.png', imageAlt: 'Tank the Bulldog', title: 'Tank', subtitle: 'Street Enforcer' },
  { image: '/redPanda.png', imageAlt: 'Rusty the Red Panda', title: 'Rusty', subtitle: 'Smooth Operator' },
  { image: '/tiger2.png', imageAlt: 'Blaze the Tiger', title: 'Blaze', subtitle: 'Street King' },
];

const ProofOfWorkDemo = () => (
  <ProofOfWork title="The Crew" works={works} />
);

export { ProofOfWorkDemo };

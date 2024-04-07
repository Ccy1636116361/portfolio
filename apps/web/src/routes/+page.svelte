<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import { Github, Linkedin } from "lucide-svelte";

</script>
<svelte:head>
    <title>Chris Young • Home</title> 
</svelte:head>

<div class="flex flex-col sm:p-20 gap-4">
    <span class="text-primary text-xl">Hello! I am</span>
    <span class="text-8xl">Chris Young</span>
    <div class="flex flex-col">
        <span class="text-primary">Full Stack Developer</span>
        <div>
            <span>Web Developer</span> <span class="text-primary"> • </span> <span>Software Engineer</span> <span class="text-primary"> • </span><span>Programmer</span>
        </div>
    </div>
    <div class="flex gap-4">
        <Button href="/resume" variant="default" size="lg" class="h-14">Resume</Button>
        <Button href="/contact" variant="outline" size="lg" class="h-14">Contact</Button>
    </div>
    <div class="flex gap-4">
        <a href="https://github.com/ccy3691" target="_blank">
            <Github/>
        </a>
        <a href="https://www.linkedin.com/in/chrisyoung96/" target="_blank">
            <Linkedin />
        </a>
    </div>
</div>
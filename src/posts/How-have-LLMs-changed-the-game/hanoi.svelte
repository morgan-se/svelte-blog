<script lang="ts">
    import { onMount } from "svelte";
  
    // Define types for peg and disk
    type Peg = number[];
    let numDisks: number = 3; // Initial number of disks
    let pegs: Peg[] = [
      Array.from({ length: numDisks }, (_, i) => numDisks - i), // Source peg (disk sizes)
      [], // Auxiliary peg
      [] // Target peg
    ];
  
    let selectedDisk: number | null = null;
    let selectedPeg: number | null = null;
  
    // Function to move disk between pegs
    const moveDisk = (fromIndex: number, toIndex: number): void => {
      if (pegs[fromIndex].length === 0) return; // Don't do anything if source peg is empty
      const disk = pegs[fromIndex].pop()!; // Get the disk from the source peg
      pegs[toIndex].push(disk); // Add the disk to the target peg
      pegs = pegs; // set pegs so Svelte knows to render
      checkWin();
    };
  
    // Function to handle drag and drop
    const handleDragStart = (pegIndex: number, diskIndex: number): void => {
      selectedDisk = pegs[pegIndex][diskIndex];
      selectedPeg = pegIndex;
    };
  
    const handleDragOver = (event: DragEvent, pegIndex: number): void => {
      event.preventDefault(); // Allow dropping
    };
  
    const handleDrop = (event: DragEvent, pegIndex: number): void => {
      if (selectedPeg === pegIndex || selectedDisk === null) return; // Don't move if dropped on the same peg or no disk selected
      const fromIndex = selectedPeg;
      const toIndex = pegIndex;
  
      // Check if the move is legal
      const from = pegs[fromIndex!];
      const to = pegs[toIndex];
  
      if (to.length === 0 || to[to.length - 1] > selectedDisk) {
        moveDisk(fromIndex!, toIndex);
      }
  
      selectedDisk = null;
      selectedPeg = null;
    };
  
    // Function to check if the game is won
    const checkWin = (): void => {
      if (pegs[2].length === numDisks) {
        alert("You win!");
        // resetGame();
      }
    };
  
    // Function to reset the game
    const resetGame = (): void => {
      pegs = [
        Array.from({ length: numDisks }, (_, i) => numDisks - i),
        [],
        []
      ];
    };
  
    // Function to initialize game state on mount
    onMount(() => {
      resetGame();
    });
  </script>
  
  <style>
    .peg {
      display: inline-block;
      width: 100px;
      height: 200px;
      background-color: #aaa;
      margin: 10px;
      border-radius: 10px;
      position: relative;
      text-align: center;
    }
  
    .disk {
      width: 100%;
      height: 20px;
      background-color: steelblue;
      margin-bottom: 5px;
      border-radius: 5px;
      cursor: pointer;
      position: absolute;
      left: 50%; /* Center the disk horizontally */
      transform: translateX(-50%); /* Offset by half of its width to truly center it */
    }
  
    .disk.small { width: 60%; }
    .disk.medium { width: 80%; }
    .disk.large { width: 100%; }
  
    .peg-container {
      display: flex;
      justify-content: center;
    }
  
    /* Stack the disks from the bottom up */
    .peg > .disk {
      top: unset; /* Remove any default 'top' positioning */
    }
  
    .peg > .disk.small { bottom: 5px; }
    .peg > .disk.medium { bottom: 30px; }
    .peg > .disk.large { bottom: 55px; }
  
    .peg, .disk {
      transition: all 0.3s ease;
    }
  </style>
  
  <div>
    <div class="peg-container">
      {#each pegs as peg, pegIndex}
        <div
          class="peg"
          role="region"
          aria-labelledby={`peg-${pegIndex}`}
          on:drop={(event) => handleDrop(event, pegIndex)}
          on:dragover={(event) => handleDragOver(event, pegIndex)}
          id={`peg-${pegIndex}`}
        >
          {#each peg as disk, diskIndex}
            <!-- svelte-ignore a11y_interactive_supports_focus -->
            <div
              class="disk {disk === numDisks ? 'large' : (disk === numDisks - 1 ? 'medium' : 'small')}"
              draggable="true"
              on:dragstart={() => handleDragStart(pegIndex, diskIndex)}
              role="button"
              aria-grabbed="false"
              style="bottom: {diskIndex * 25}px;">
              {disk}
            </div>
          {/each}
        </div>
      {/each}
    </div>
    <button on:click={resetGame} tabindex="0">Reset Game</button>
  </div>
  
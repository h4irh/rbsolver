document.addEventListener('DOMContentLoaded', function() {
    // Current selected color
    let selectedColor = '';
    
    // Cube state representation
    const cubeState = {
        U: Array(9).fill(''), // Up (white)
        D: Array(9).fill(''), // Down (yellow)
        F: Array(9).fill(''), // Front (green)
        B: Array(9).fill(''), // Back (blue)
        L: Array(9).fill(''), // Left (orange)
        R: Array(9).fill('')  // Right (red)
    };
    
    // Color mapping for scrambling
    const colorMap = {
        white: 'U',
        yellow: 'D',
        green: 'F',
        blue: 'B',
        orange: 'L',
        red: 'R'
    };
    
    // Initialize color selection
    const colors = document.querySelectorAll('.color:not(.selected)');
    const selectedColorDisplay = document.querySelector('.color.selected');
    
    colors.forEach(color => {
        color.addEventListener('click', function() {
            selectedColor = this.getAttribute('data-color');
            selectedColorDisplay.style.backgroundColor = this.style.backgroundColor;
            selectedColorDisplay.setAttribute('data-color', selectedColor);
        });
    });
    
    // Initialize cube pieces
    const cubePieces = document.querySelectorAll('.cube-piece');
    
    cubePieces.forEach(piece => {
        piece.addEventListener('click', function() {
            if (!selectedColor) return;
            
            const position = this.getAttribute('data-position');
            const face = position[0];
            const index = parseInt(position[1]) - 1;
            
            // Update visual
            this.style.backgroundColor = getColorValue(selectedColor);
            
            // Update state
            cubeState[face][index] = selectedColor;
        });
    });
    
    // Button event listeners
    document.getElementById('solve-btn').addEventListener('click', solveCube);
    document.getElementById('reset-btn').addEventListener('click', resetCube);
    document.getElementById('scramble-btn').addEventListener('click', scrambleCube);
    
    // Helper function to get CSS color value
    function getColorValue(colorName) {
        const styles = getComputedStyle(document.documentElement);
        return styles.getPropertyValue(`--${colorName}`).trim();
    }
    
    // Solve cube function (simplified for demo)
    function solveCube() {
        const solutionSteps = document.getElementById('solution-steps');
        solutionSteps.innerHTML = '';
        
        // Check if all pieces are filled
        let allFilled = true;
        for (const face in cubeState) {
            if (cubeState[face].some(color => color === '')) {
                allFilled = false;
                break;
            }
        }
        
        if (!allFilled) {
            solutionSteps.innerHTML = '<p>Please fill in all cube pieces before solving.</p>';
            return;
        }
        
        // In a real implementation, this would call a cube solving algorithm
        // For this demo, we'll just show a placeholder solution
        
        solutionSteps.innerHTML = `
            <p>Cube solution steps:</p>
            <ol>
                <li>White cross: F R U R' U' F'</li>
                <li>White corners: R U R' U R U2 R'</li>
                <li>Middle layer: U R U' R' U' F' U F</li>
                <li>Yellow cross: F R U R' U' F'</li>
                <li>Yellow edges: R U R' U R U2 R'</li>
                <li>Position corners: U R U' L' U R' U' L</li>
                <li>Orient corners: R' D' R D (repeat as needed)</li>
            </ol>
            <p>Note: This is a generic solution. A real solver would analyze your cube state.</p>
        `;
    }
    
    // Reset cube function
    function resetCube() {
        // Reset state
        for (const face in cubeState) {
            cubeState[face] = Array(9).fill('');
        }
        
        // Reset visuals
        cubePieces.forEach(piece => {
            piece.style.backgroundColor = getColorValue('gray');
        });
        
        document.getElementById('solution-steps').innerHTML = '';
    }
    
    // Scramble cube function
    function scrambleCube() {
        const faces = ['U', 'D', 'F', 'B', 'L', 'R'];
        const colorNames = ['white', 'yellow', 'green', 'blue', 'orange', 'red'];
        
        // Fill each face with its corresponding color
        faces.forEach(face => {
            const color = colorMap[colorNames[faces.indexOf(face)]];
            cubeState[face] = Array(9).fill(color);
        });
        
        // Update visuals
        cubePieces.forEach(piece => {
            const position = piece.getAttribute('data-position');
            const face = position[0];
            const color = cubeState[face][parseInt(position[1]) - 1];
            piece.style.backgroundColor = getColorValue(color);
        });
        
        document.getElementById('solution-steps').innerHTML = '<p>Cube scrambled to solved state. Now you can manually edit it.</p>';
    }
    
    // Initialize with empty cube
    resetCube();
});

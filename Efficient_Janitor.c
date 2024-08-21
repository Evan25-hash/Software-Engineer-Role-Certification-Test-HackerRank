// Efficient Janitor

#include <stdio.h>
void quickSort(float arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}
int partition(float arr[], int low, int high) {
    float pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            float temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
 }
}
    float temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return (i + 1);
}
int efficientJanitor(float weight[], int n) {
    int count = 0;
    int i = 0, j = n - 1;
    quickSort(weight, 0, n - 1);
    while (i <= j) {
        count++;
        if (weight[i] + weight[j] <= 3.0) {
            i++;
        }
        j--;
    }
    return count;
}
int main() {
    int weight_count;
    scanf("%d", &weight_count);
    float weight[1000];
    
    for (int i = 0; i < weight_count; i++) {
        scanf("%f", &weight[i]);
    }
    int result = efficientJanitor(weight, weight_count);
    printf("%d\n", result);
    return 0;
}
